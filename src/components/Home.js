import React, { useState } from "react";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import CreateADebate from "./CreateADebate";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const goToCreateDebate = () => {
    navigate("/createdebate");
    // const me = "../../public/images/pf1.jpg";
  };
  return (
    <div>
      <h1>This is home page</h1>
      <div>
        <Notification />
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={goToCreateDebate}>Create Debate</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setIsModalOpen(true)}>Start a Debate</button>

        <CreateADebate
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Home;
