import { motion } from 'framer-motion';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Flashcard } from '../types/Flashcard';
import { useData } from '../utils/DataProvider';

const FlashCards: React.FC<Flashcard> = ({
    id,
    front,
    back,
    admin,
    setFlashCard,
}) => {
    const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

    const cardRef = React.useRef<any>(null);

    const {
        setFormData,
        setOpenModal,
        setUpdate,
        deleteCard,
        setCardId,
        getAllCards,
    } = useData();

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (cardRef.current && !cardRef.current.contains(target)) {
            setIsFlipped(false); // Flip back to front when clicking outside
        }
    };

    const editCard = () => {
        setFormData({
            question: front,
            answer: back,
        });
        setOpenModal(true);
        setUpdate(true);
        setCardId(id);
    };

    const removeCard = async () => {
        // setCardId(id);
        const data = await deleteCard(id);
        alert(data.message);
        const response = await getAllCards();
        setFlashCard!(response);
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <motion.div
            ref={cardRef}
            onClick={handleFlip}
            style={{
                width: '100%',
                height: '30rem',
                perspective: '1000px',
            }}
        >
            <motion.div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center',
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Front Side */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#1B1B1B',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '24px',
                        color: '#fff',
                        borderRadius: '24px',
                        border: '1px solid white',
                        overflow: 'auto',
                        cursor: 'pointer',
                        padding: '1.5rem',
                        textAlign: 'center',
                    }}
                >
                    {admin && (
                        <div className="ml-auto flex justify-center items-center gap-2">
                            <button
                                className="text-[#E11D48]"
                                onClick={removeCard}
                            >
                                <MdDelete />
                            </button>
                            <button onClick={editCard}>
                                <FaEdit />
                            </button>
                        </div>
                    )}
                    <span className="my-auto">{front}</span>
                </motion.div>

                {/* Back Side */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#E11D48',
                        fontSize: '20px',
                        color: '#fff',
                        transform: 'rotateY(180deg)',
                        borderRadius: '24px',
                        border: '1px solid white',
                        overflow: 'auto',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                >
                    {back}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FlashCards;
