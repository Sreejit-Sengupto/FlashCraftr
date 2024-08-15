import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };
    return (
        <button
            className="p-6"
            // className="p-6 bg-[#211012]  rounded-full shadow-red-ball"
            onClick={logout}
        >
            <IoMdLogOut color="#E11D48" size={'2em'} />
        </button>
    );
};

export default LogoutBtn;
