import { GiShare } from 'react-icons/gi';
import { IoMdAdd } from 'react-icons/io';
import { TbCardsFilled } from 'react-icons/tb';

const TopBar = ({
    setOpenModal,
}: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
            <p className="text-white flex justify-start items-center text-lg">
                <span className="text-[#E11D48] mx-1">
                    <TbCardsFilled />
                </span>
                <span>
                    <span className="text-[#E11D48]">Flash </span>
                    Craftr
                </span>
            </p>

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
