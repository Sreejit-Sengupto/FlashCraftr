import React from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';
import TopBar from '../components/TopBar';
import LogoutBtn from '../components/Logout';
import FlashCards from '../components/FlashCards';
import Modal from '../components/Modal';
import { redirect, useLoaderData } from 'react-router-dom';
import { useData } from '../utils/DataProvider';

export async function loader() {
    if (!localStorage.getItem('username')) {
        return redirect('/');
    }
    try {
        const response = await axiosInstance.request({
            url: '/api/v1/flashcard/get-all',
            method: 'get',
            params: {
                username: localStorage.getItem('username'),
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

const Dashboard = () => {
    const [flashcard, setFlashCard] = React.useState<any>(useLoaderData());

    const { openModal, setOpenModal } = useData();

    const flashCards =
        flashcard &&
        flashcard.flashcards.map((item: any) => {
            return (
                <FlashCards
                    key={item._id}
                    id={item._id}
                    admin={true}
                    front={item.question}
                    back={item.answer}
                    setFlashCard={setFlashCard}
                />
            );
        });

    return (
        <div>
            <TopBar setOpenModal={setOpenModal} />

            {flashcard.flashcards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mx-auto place-items-center px-6 py-3">
                    {flashCards}
                </div>
            ) : (
                <p className="h-[50rem] flex justify-center items-center text-gray-400">
                    Created flashcards will be displayed here...
                </p>
            )}

            {openModal ? (
                <div className="w-[90%] lg:w-auto text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30">
                    <Modal
                        setOpenModal={setOpenModal}
                        setFlashCards={setFlashCard}
                    />
                </div>
            ) : null}

            <div className="fixed bottom-4 right-3">
                <LogoutBtn />
            </div>
        </div>
    );
};

export default Dashboard;
