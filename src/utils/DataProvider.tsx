import React, { createContext, useContext } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';
import { redirect } from 'react-router-dom';

interface Form {
    question: string;
    answer: string;
}

interface Data {
    formData: Form;
    setFormData: React.Dispatch<React.SetStateAction<Form>>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    cardId: string;
    setCardId: React.Dispatch<React.SetStateAction<string>>;
    getCard: (username: string, page: number) => Promise<any>;
    getAllCards: () => Promise<any>;
    createCard: () => Promise<any>;
    updateCard: () => Promise<any>;
    deleteCard: (id: string) => Promise<any>;
}

const DataContext = createContext<Data | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [formData, setFormData] = React.useState<Form>({
        question: '',
        answer: '',
    });
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [update, setUpdate] = React.useState<boolean>(false);
    const [cardId, setCardId] = React.useState<string>('');

    const getCard = async (username: string, page: number) => {
        try {
            const response = await axiosInstance.request({
                url: `/api/v1/flashcard/get`,
                method: 'get',
                params: {
                    username: username,
                    page: page,
                },
            });
            if (response.data.flashCards.length === 0) {
                throw redirect('/');
            }
            return response.data;
        } catch (error) {
            alert('Failed to get cards');
        }
    };

    const getAllCards = async () => {
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
            alert('Failed to get cards');
        }
    };

    const createCard = async () => {
        try {
            const response = await axiosInstance.request({
                url: '/api/v1/flashcard/create',
                method: 'post',
                data: {
                    question: formData.question,
                    answer: formData.answer,
                    username: localStorage.getItem('username'),
                },
            });
            return response.data;
        } catch (error) {
            alert('Failed to create card');
        }
    };

    const updateCard = async () => {
        try {
            const response = await axiosInstance.request({
                url: '/api/v1/flashcard/update',
                method: 'patch',
                data: {
                    id: cardId,
                    question: formData.question,
                    answer: formData.answer,
                },
            });
            return response.data;
        } catch (error) {
            alert('Failed to update card');
            console.log('Failed to update card', error);
        }
    };

    const deleteCard = async (id: string) => {
        try {
            const response = await axiosInstance.request({
                url: '/api/v1/flashcard/delete',
                method: 'delete',
                data: {
                    id,
                },
            });
            return response.data;
        } catch (error) {
            alert('Failed to delete card');
        }
    };

    const contextData = {
        formData,
        setFormData,
        openModal,
        setOpenModal,
        update,
        setUpdate,
        cardId,
        setCardId,
        getCard,
        getAllCards,
        createCard,
        updateCard,
        deleteCard,
    };

    return (
        <DataContext.Provider value={contextData}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext) as Data;
};

export default DataContext;
