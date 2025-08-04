import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DebatePost = () => {
  const [opinion, setOpinion] = useState("");
  const [topic, setTopic] = useState("Politics");
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("debatePosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  //   useEffect(() => {
  //     const savedPosts = localStorage.getItem("debatePosts");
  //     if (savedPosts) {
  //       setPosts(JSON.parse(savedPosts));
  //     }
  //   }, []);
  useEffect(() => {
    localStorage.setItem("debatePosts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    alert(`Posted ${topic} with : ${opinion}`);
    const newPost = {
      id: Date.now(),
      opinion: opinion,
      topic: topic,
    };
    setPosts([newPost, ...posts]);
    setOpinion("");
  };

  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  const post = [
    { id: 1, topic: "Politics", opinion: "Democratic nation" },
    { id: 2, topic: "Tech", opinion: "AI is modern tech." },
    { id: 3, topic: "Sports", opinion: "Practice makes man perfect." },
    { id: 4, topic: "Politics", opinion: "Freedom for all." },
    { id: 5, topic: "Tech", opinion: "Robots are harmfull." },
    { id: 6, topic: "Sports", opinion: "Football is well known sport" },
  ];

  const allPosts = [...post, ...posts];

  const [selectTopic, setSelectedTopic] = useState("All");
  const topics = ["All", "Politics", "Tech", "Sports"];

  const filterSelect =
    selectTopic === "All"
      ? allPosts
      : allPosts.filter((post) => post.topic === selectTopic);

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
        <h2>All posts</h2>
        <div>
          <label>Select any topic:</label>
          <select
            value={selectTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {filterSelect.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          filterSelect.map((post) => (
            <div key={post.id} className="post-list">
              <h3>{post.topic}</h3>
              <p>{post.opinion}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DebatePost;
