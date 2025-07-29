import react, { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const DebatePost = () => {
  const [opinion, setOpinion] = useState("");
  const [topic, setTopic] = useState("Politics");

  const handlePost = () => {
    alert(`Posted ${topic} with : ${opinion}`);
  };
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <button onClick={goToHomePage}>GoBack</button>
      <div className="debate-post">
        <h1>Debate Post</h1>
        <div>
          <label> Select Topic:</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="Politics">Politics</option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div>
          <label>Your opinion</label>
          <textarea
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            placeholder="Write your opinion here"
          ></textarea>
        </div>
        <div>
          <button onClick={handlePost}>Post</button>
        </div>
      </div>
    </>
  );
};

export default DebatePost;
