import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DebatePost = () => {
  const [opinion, setOpinion] = useState("");
  const [replyText, setReplyText] = useState({});

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

  const handleAddReply = (postId) => {
    const text = replyText[postId]?.trim();
    if (!text) return;

    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, replies: [...(p.replies || []), text] } : p
      )
    );

    // Also update dummy 'post' array replies if you want replies for them too
    setReplyText({ ...replyText, [postId]: "" });
  };

  const handlePost = () => {
    alert(`Posted ${topic} with : ${opinion}`);
    const newPost = {
      id: Date.now(),
      opinion: opinion,
      topic: topic,
      replies: [],
    };
    setPosts([newPost, ...posts]);
    setOpinion("");
  };

  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  const post = [
    {
      id: 1,
      topic: "Politics",
      opinion: "Democratic nation",
      replies: ["yes. for sure"],
    },
    { id: 2, topic: "Tech", opinion: "AI is modern tech.", replies: ["Yeaaa"] },
    {
      id: 3,
      topic: "Sports",
      opinion: "Practice makes man perfect.",
      replies: ["Thats true"],
    },
    {
      id: 4,
      topic: "Politics",
      opinion: "Freedom for all.",
      replies: ["It should be"],
    },
    {
      id: 5,
      topic: "Tech",
      opinion: "Robots are harmfull.",
      replies: ["They can be "],
    },
    {
      id: 6,
      topic: "Sports",
      opinion: "Football is well known sport",
      replies: ["Maybe"],
    },
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
            <div
              key={post.id}
              className="post-list"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{post.topic}</h3>
              <p>{post.opinion}</p>

              {/* Replies list */}
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                {post.replies && post.replies.length > 0 ? (
                  post.replies.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        borderLeft: "2px solid #ccc",
                        paddingLeft: "8px",
                        marginBottom: "5px",
                        background: "#f9f9f9",
                      }}
                    >
                      {r}
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#888" }}>No replies yet</p>
                )}
              </div>

              {/* Add reply */}
              <div style={{ marginTop: "8px" }}>
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText[post.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [post.id]: e.target.value })
                  }
                />
                <button
                  style={{ width: "80px", height: "20" }}
                  onClick={() => handleAddReply(post.id)}
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DebatePost;
