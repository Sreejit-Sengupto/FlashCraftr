import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [username, setUsername] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const navigate = useNavigate();

    const login = () => {
        setLoading(true);
        if (!username) {
            alert('Username is required');
            return;
        }
        localStorage.setItem('username', username);
        navigate('/dashboard');
        setLoading(false);
    };

    return (
        <div className="h-[100dvh] flex flex-col justify-center items-center">
            <div className="p-6 bg-[#211012] w-40 h-40 rounded-full shadow-red-ball absolute top-0 left-0 -z-20"></div>
            <div className="w-[90%] md:max-w-[35%] h-[30rem] bg-[#1B1B1B] border border-gray-400 hover:border-white duration-200 mx-auto mt-24 rounded-3xl flex flex-col justify-center items-center py-10">
                <div className="mb-20 flex flex-col justify-center items-center">
                    <h1 className="text-white text-4xl flex justify-center items-center">
                        <span>
                            <TbCardsFilled className="inline" color="#E11D48" />
                        </span>
                        <span className="text-[#E11D48] mx-2">Flash</span>
                        Craftr
                    </h1>
                    <p className="text-[#C3C3C3]">
                        Ready to Flash Into Knowledge?
                    </p>
                </div>
                <p className="max-w-[30rem] text-center text-[#C3C3C3] mb-10">
                    Welcome back! Sign in to continue creating, organizing, and
                    mastering your flashcards. Learn efficiently and at your own
                    pace, anywhere, anytime. Your personalized learning
                    experience is just a click away.
                </p>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-6 py-2 border hover:border-[#E11D48] rounded-full text-white min-w-44 mb-1 bg-transparent focus:outline-none focus:ring focus:ring-[#E11D48] focus:border-[#E11D48]"
                    placeholder="Enter your username"
                />
                <button
                    onClick={login}
                    className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white min-w-44 mt-1 focus:outline-none focus:ring focus:ring-[#ff7f9b]"
                >
                    {loading ? 'Getting you in...' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default Homepage;
