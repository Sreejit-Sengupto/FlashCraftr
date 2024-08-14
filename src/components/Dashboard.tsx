import React from "react";
import { TbCardsFilled } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GiShare } from "react-icons/gi";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export async function loader() {
  if (!localStorage.getItem("username")) {
    return redirect("/");
  }
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/flashcard/get-all?username=${localStorage.getItem(
        "username"
      )}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

const Dashboard = () => {
  const [flashcard, setFlashCard] = React.useState<any>(useLoaderData());
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const flashCards =
    flashcard &&
    flashcard.flashcards.map((item: any) => {
      return (
        <FlashCards key={item._id} front={item.question} back={item.answer} />
      );
    });

  return (
    <div>
      <TopBar setOpenModal={setOpenModal} />

      {flashcard.flashcards.length > 0 ? (
        <div className="grid grid-cols-5 gap-3 mx-auto place-items-center px-6">
          {flashCards}
        </div>
      ) : (
        <p className="h-[50rem] flex justify-center items-center text-gray-400">
          Created flashcards will be displayed here...
        </p>
      )}

      {openModal ? (
        <div className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Modal setOpenModal={setOpenModal} setFlashCards={setFlashCard} />
        </div>
      ) : null}

      <div className="fixed bottom-4 right-3">
        <LogoutBtn />
      </div>
    </div>
  );
};

const TopBar = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const copyText = () => {
    navigator.clipboard.writeText(`http://localhost:5173/playground/${localStorage.getItem('username')}`).then(
      () => {
        alert('Invite link copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy invite link: ', err);
      }
    );
  }

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
        <button className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white min-w-40 mt-1 focus:outline-none focus:ring focus:ring-[#ff7f9b] flex justify-center items-center" onClick={copyText}>
          <span className="mr-1">
            <GiShare size={'1.5em'}/>
          </span>
          <span>Invite to playground</span>
        </button>
        <button
          className="bg-[#E11D48] px-6 py-2 border border-[#E11D48] rounded-full text-white min-w-40 mt-1 focus:outline-none focus:ring focus:ring-[#ff7f9b] flex justify-center items-center"
          onClick={() => setOpenModal(true)}
        >
          <IoMdAdd className="mr-1" size={'1.5em'}/>
          Create
        </button>
      </div>
    </div>
  );
};

const LogoutBtn = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <button
      className="p-6 bg-[#211012]  rounded-full shadow-red-ball"
      onClick={logout}
    >
      <IoMdLogOut color="#E11D48" size={"2em"} />
    </button>
  );
};

export const FlashCards = ({ front, back }: { front: string; back: string }) => {
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);
  const cardRef = React.useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsFlipped(false); // Flip back to front when clicking outside
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
    ref={cardRef}
      onClick={handleFlip}
      style={{
        width: "100%",
        height: "30rem",
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transformOrigin: "center",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front Side */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#1B1B1B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            color: "#fff",
            borderRadius: "24px",
            border: "1px solid white",
            overflow: "auto",
            cursor: "pointer",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          {front}
        </motion.div>

        {/* Back Side */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#E11D48",
            fontSize: "20px",
            color: "#fff",
            transform: "rotateY(180deg)",
            borderRadius: "24px",
            border: "1px solid white",
            overflow: "auto",
            padding: "1.5rem",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          {back}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Modal = ({
  setOpenModal,
  setFlashCards,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFlashCards: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [formData, setFormData] = React.useState({
    question: "",
    answer: "",
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllCards = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/flashcard/get-all?username=${localStorage.getItem(
        "username"
      )}`
    );
    setFlashCards(response.data);
  };

  const createFlashCard = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/flashcard/create", {
        question: formData.question,
        answer: formData.answer,
        username: localStorage.getItem("username"),
      });
      // Either call getAllFlashcards or simply append it to the existing state
      await getAllCards();

      setFormData({
        question: "",
        answer: "",
      });
      setOpenModal(false);
    } catch (error) {
      alert("Failed to create card");
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
      className="bg-[#161616] w-[42rem] h-[40rem] p-6 flex flex-col justify-center items-center rounded-lg"
    >
      <button className="ml-auto" onClick={() => setOpenModal(false)}>
        <IoIosCloseCircleOutline color="#E11D48" size={"1.5em"} />
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
        onClick={createFlashCard}
      >
        {loading ? "Creating your card..." : "Add"}
      </button>
    </motion.div>
  );
};

export default Dashboard;
