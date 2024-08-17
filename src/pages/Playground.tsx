// import axios from "axios";
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TbCardsFilled } from 'react-icons/tb';
// import axiosInstance from "../axiosInstance/axiosInstance";
import FlashCards from '../components/FlashCards';
import { useData } from '../utils/DataProvider';

const Playground = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const [page, setPage] = React.useState<number>(1);
    const [flashCard, setFlashCard] = React.useState<any>(null);

    const { getCard } = useData();

    React.useEffect(() => {
        const socket = new WebSocket('wss://flashcraftr-server.onrender.com');
        socket.onopen = () => {
            socket.send(JSON.stringify({ action: 'enter' }));
            console.log('Connected to WS');
        };

        socket.onclose = () => {
            console.log('Disconnected from WS');
        };

        window.addEventListener('beforeunload', () => {
            socket.send(JSON.stringify({ action: 'leave' }));
        });

        return () => {
            socket.send(JSON.stringify({ action: 'leave' }));
            socket.close();
        };
    }, []);

    const getCards = async () => {
        const response = await getCard(username!, page);

        if (response.flashCards.length === 0) {
            navigate('/');
        }
        setFlashCard(response);
    };

    const nextCard = () => setPage((prev) => prev + 1);
    const prevCard = () => setPage((prev) => prev - 1);

    React.useEffect(() => {
        if (!username) {
            navigate('/');
        }
        getCards();
    }, [page]);

    return (
        <div className="w-[95%] lg:w-[30%] h-[100dvh] flex flex-col justify-around items-center mx-auto">
            <div className="p-6 bg-[#211012] w-40 h-40 rounded-full shadow-red-ball absolute top-0 left-0 -z-20"></div>
            <h1 className="text-white text-4xl flex justify-center items-center">
                <span>
                    <TbCardsFilled className="inline" color="#E11D48" />
                </span>
                <span className="text-[#E11D48] mx-2">Flash</span>
                Craftr
            </h1>
            {flashCard && (
                <FlashCards
                    admin={false}
                    id={flashCard.flashCards[0]._id}
                    front={flashCard.flashCards[0].question}
                    back={flashCard.flashCards[0].answer}
                />
            )}

            <div className="flex justify-center items-center gap-2">
                <button
                    className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white min-w-44 mt-2 focus:outline-none focus:ring focus:ring-[#ff7f9b]"
                    onClick={prevCard}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button
                    className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white min-w-44 mt-2 focus:outline-none focus:ring focus:ring-[#ff7f9b]"
                    onClick={nextCard}
                    disabled={flashCard && page === flashCard.totalCards}
                >
                    Next
                </button>
            </div>

            <Link to={'/'} target="_blank" className="text-blue-600">
                Create your own FlashCard
            </Link>
        </div>
    );
};

export default Playground;
