import React from 'react';

export interface Flashcard {
    admin: boolean;
    id: string;
    front: string;
    back: string;
    setFlashCard?: React.Dispatch<React.SetStateAction<any>>;
}
