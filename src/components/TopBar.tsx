import { GiShare } from 'react-icons/gi';
import { IoMdAdd } from 'react-icons/io';
import { TbCardsFilled } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa6';
import React from 'react';
import { motion } from 'framer-motion';

const TopBar = ({
    setOpenModal,
}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [liveCount, setLiveCount] = React.useState<number>(0);

    React.useEffect(() => {
        const socket = new WebSocket('wss://flashcraftr.vercel.app');
        socket.onopen = () => {
            console.log('Connected to WS');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setLiveCount(data.users);
            console.log(data.users);
        };

        socket.onclose = () => {
            console.log('Disconnected from WS');
        };

        return () => {
            socket.close();
        };
    }, []);

    const copyText = () => {
        const text = import.meta.env.DEV
            ? 'http://localhost:5173'
            : 'https://flashcraftr.vercel.app';
        navigator.clipboard
            .writeText(`${text}/playground/${localStorage.getItem('username')}`)
            .then(
                () => {
                    alert('Invite link copied to clipboard!');
                },
                (err) => {
                    console.error('Failed to copy invite link: ', err);
                },
            );
    };

    return (
        <div className="bg-black p-6 flex justify-between items-center">
            <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center lg:gap-6">
                <p className="text-white flex justify-start items-center text-lg">
                    <span className="text-[#E11D48] mx-1">
                        <TbCardsFilled />
                    </span>
                    <span>
                        <span className="text-[#E11D48]">Flash </span>
                        Craftr
                    </span>
                </p>

                <div className="text-white flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                        <motion.div
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                backgroundColor: 'red',
                            }}
                            animate={{
                                opacity: [1, 0, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <FaUser size={'1.1rem'} />
                    </div>

                    <p className="text-xl">{liveCount}</p>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2">
                <button
                    className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white lg:min-w-40 mt-1 focus:outline-none focus:ring focus:ring-[#ff7f9b] flex justify-center items-center"
                    onClick={copyText}
                >
                    <span className="mr-1">
                        <GiShare size={'1.5em'} />
                    </span>
                    <span className="hidden sm:inline">
                        Invite to playground
                    </span>
                </button>
                <button
                    className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white lg:min-w-40 mt-1 focus:outline-none focus:ring focus:ring-[#ff7f9b] flex justify-center items-center"
                    onClick={() => setOpenModal(true)}
                >
                    <IoMdAdd className="sm:mr-1" size={'1.5em'} />
                    <span className="hidden sm:inline">Create</span>
                </button>
            </div>
        </div>
    );
};

export default TopBar;
