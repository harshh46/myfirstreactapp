import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const goToCreateDebate = () => {
    navigate("/createdebate");
  };
  return (
    <div>
      <h1>This is home page</h1>
      <button onClick={goToCreateDebate}>Create Debate</button>
    </div>
  );
};

export default Home;
