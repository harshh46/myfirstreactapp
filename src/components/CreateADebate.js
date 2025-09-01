import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

const CreateADebate = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [like, setLike] = useState({});
  const [bookmark, setBookmark] = useState({});
  const [comments, setComments] = useState({});
  const [showEmoji, setShowEmoji] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const CommentEndRef = useRef(null);

  const handleClick = () => {
    console.log({ title, description, category });
    setTitle("");
    setDescription("");
    setCategory("");
    onClose();
  };

  const post = [
    { id: 1, topic: "Politics", description: "Democratic nation" },
    { id: 2, topic: "Tech", description: "AI is modern tech." },
    { id: 3, topic: "Sports", description: "Practice makes man perfect." },
    { id: 4, topic: "Politics", description: "Freedom for all." },
    { id: 5, topic: "Tech", description: "Robots are harmful." },
    { id: 6, topic: "Sports", description: "Football is well known sport" },
  ];

  const handleLike = (id) => {
    setLike((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookmark = (id) => {
    setBookmark((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const HandleAddComment = (id, text) => {
    if (!text.trim()) return;
    const newComment = {
      id,
      username: "demo",
      text,
      avatar:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y", // fallback avatar
    };
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment],
    }));
  };

  const handleEmojiClick = (emojiData, postId) => {
    setCommentInput((prev) => ({
      ...prev,
      [postId]: (prev[postId] || "") + emojiData.emoji,
    }));
  };

  // useEffect(() => {
  //   if (CommentEndRef.current) {
  //     CommentEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [comments]);

  // 🔥 put this after hooks
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h2>Create A Debate</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✖
          </button>
        </div>

        <div className="modal-body">
          <input
            type="text"
            placeholder="Debate title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Debate description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Politics">Politics</option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
          </select>

          <button
            className="submit-btn"
            onClick={handleClick}
            disabled={!title.trim()}
          >
            Submit
          </button>

          <div className="posts-container">
            {post.map((p) => (
              <div
                key={p.id}
                style={{ border: "2px solid gray", margin: "10px" }}
                className="post-card"
              >
                <h3 style={{ paddingLeft: "10px" }}>{p.topic}</h3>
                <p style={{ paddingLeft: "10px" }}>{p.description}</p>
                <button
                  style={{ paddingLeft: "10px" }}
                  className={`like-btn ${like[p.id] ? "active" : ""}`}
                  onClick={() => handleLike(p.id)}
                >
                  {like[p.id] ? "❤️ Liked" : "🤍 Like"}
                </button>
                <button
                  style={{ paddingLeft: "10px" }}
                  className={`bookmark-btn ${bookmark[p.id] ? "active" : ""}`}
                  onClick={() => handleBookmark(p.id)}
                >
                  {bookmark[p.id] ? "🔖 Bookmarked" : "📑 Bookmark"}
                </button>

                {/* Comment Box */}
                <div style={{ marginTop: "10px", marginLeft: "5px" }}>
                  <textarea
                    placeholder="Write a comment..."
                    value={commentInput[p.id] || ""}
                    maxLength={200}
                    onChange={(e) =>
                      setCommentInput((prev) => ({
                        ...prev,
                        [p.id]: e.target.value,
                      }))
                    }
                    style={{ width: "95%", height: "60px" }}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <small>{(commentInput[p.id] || "").length}/200</small>
                    <div>
                      <button
                        onClick={() =>
                          setShowEmoji(showEmoji === p.id ? null : p.id)
                        }
                      >
                        😀 Emoji
                      </button>
                      <button
                        onClick={() => {
                          HandleAddComment(p.id, commentInput[p.id]);
                          console.log("posted", {
                            username: "demo",
                            text: commentInput[p.id],
                          });
                          setCommentInput((prev) => ({ ...prev, [p.id]: "" }));
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>

                  {/* Emoji Picker */}
                  {showEmoji === p.id && (
                    <EmojiPicker
                      onEmojiClick={(emojiData) =>
                        handleEmojiClick(emojiData, p.id)
                      }
                    />
                  )}

                  {/* Comments */}
                  <div style={{ marginTop: "10px" }}>
                    {(comments[p.id] || []).map((c, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "5px 0",
                        }}
                      >
                        <img
                          src={c.avatar}
                          alt="avatar"
                          width="30"
                          height="30"
                          style={{ borderRadius: "50%", marginRight: "8px" }}
                        />
                        <strong>{c.username}: </strong>
                        <span>{c.text}</span>
                      </div>
                    ))}
                    <div ref={CommentEndRef} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateADebate;
