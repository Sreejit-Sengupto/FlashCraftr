import { motion } from 'framer-motion';
import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useData } from '../utils/DataProvider';

const Modal = ({
    setOpenModal,
    setFlashCards,
}: {
    setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setFlashCards?: React.Dispatch<React.SetStateAction<any>>;
}) => {
    const {
        formData,
        setFormData,
        getAllCards,
        createCard,
        openModal,
        update,
        updateCard,
    } = useData();

    const [loading, setLoading] = React.useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, [openModal]);

    const fetchAllCards = async () => {
        const data = await getAllCards();
        setFlashCards!(data);
    };

    const generateFlashCard = async () => {
        try {
            setLoading(true);

            if (update) {
                await updateCard();
            } else {
                await createCard();
            }
            // Either call getAllFlashcards or simply append it to the existing state
            await fetchAllCards();

            setFormData({
                question: '',
                answer: '',
            });
            setOpenModal!(false);
        } catch (error) {
            alert('Failed to create card');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="bg-[#161616] w-full lg:w-[42rem] h-[40rem] p-6 flex flex-col justify-center items-center rounded-lg"
        >
            <button className="ml-auto" onClick={() => setOpenModal!(false)}>
                <IoIosCloseCircleOutline color="#E11D48" size={'1.5em'} />
            </button>
            <fieldset
                id="question"
                className="border rounded-md border-[#E11D48] w-full"
            >
                <legend className="ml-4">Type in your Question</legend>
                <textarea
                    placeholder="Enter your question here..."
                    value={formData.question}
                    name="question"
                    onChange={handleChange}
                    className="px-6 py-2 rounded-lg text-white mb-1 bg-transparent outline-none w-full min-h-[15rem] max-h-[15rem]"
                />
            </fieldset>

            <fieldset
                id="answer"
                className="border rounded-md border-[#E11D48] w-full"
            >
                <legend className="ml-4">
                    Type in the Answer for the above Question
                </legend>
                <textarea
                    placeholder="Enter your answer here..."
                    value={formData.answer}
                    name="answer"
                    onChange={handleChange}
                    className="px-6 py-2 rounded-lg text-white mb-1 bg-transparent outline-none w-full min-h-[15rem] max-h-[15rem]"
                />
            </fieldset>
            <button
                className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white min-w-44 mt-2 focus:outline-none focus:ring focus:ring-[#ff7f9b]"
                onClick={generateFlashCard}
            >
                {loading
                    ? update
                        ? 'Updating...'
                        : 'Adding...'
                    : update
                      ? 'Update'
                      : 'Add'}
            </button>
        </motion.div>
    );
};

export default Modal;
