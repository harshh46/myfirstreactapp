import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

// ✅ Custom Hook for Auto-Save
const useAutoSave = (key, data, delay = 1500) => {
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    if (!data.title && !data.description && !data.category) return;

    const handler = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data));
      setLastSaved(new Date().toISOString());
    }, delay);

    return () => clearTimeout(handler);
  }, [data, key, delay]);

  return lastSaved;
};

const CreateADebate = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [like, setLike] = useState({});
  const [bookmark, setBookmark] = useState({});
  const [comments, setComments] = useState({});
  const [showEmoji, setShowEmoji] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [drafts, setDrafts] = useState([]);
  const CommentEndRef = useRef(null);

  // Combine draft data
  const draftData = {
    title,
    description,
    category,
    updatedAt: new Date().toISOString(),
  };

  // ✅ Auto-save current draft
  const lastSaved = useAutoSave("current-debate-draft", draftData);

  // Load drafts & ongoing draft when modal opens
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("debate-drafts")) || [];
    setDrafts(savedDrafts);

    const currentDraft = JSON.parse(
      localStorage.getItem("current-debate-draft")
    );
    if (currentDraft) {
      setTitle(currentDraft.title || "");
      setDescription(currentDraft.description || "");
      setCategory(currentDraft.category || "");
    }
  }, []);

  // Save permanently to draft list
  const handleClick = () => {
    const newDraft = { ...draftData, id: Date.now() };
    const updatedDrafts = [...drafts, newDraft];
    setDrafts(updatedDrafts);
    localStorage.setItem("debate-drafts", JSON.stringify(updatedDrafts));

    setTitle("");
    setDescription("");
    setCategory("");
    onClose();
  };

  const deleteDraft = (id) => {
    const updatedDrafts = drafts.filter((d) => d.id !== id);
    setDrafts(updatedDrafts);
    localStorage.setItem("debate-drafts", JSON.stringify(updatedDrafts));
  };

  const editDraft = (draft) => {
    setTitle(draft.title);
    setDescription(draft.description);
    setCategory(draft.category);
  };

  // Dummy posts
  const post = [
    { id: 1, topic: "Politics", description: "Democratic nation" },
    { id: 2, topic: "Tech", description: "AI is modern tech." },
    { id: 3, topic: "Sports", description: "Practice makes man perfect." },
    { id: 4, topic: "Politics", description: "Freedom for all." },
    { id: 5, topic: "Tech", description: "Robots are harmful." },
    { id: 6, topic: "Sports", description: "Football is well known sport" },
  ];

  const handleLike = (id) => setLike((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleBookmark = (id) =>
    setBookmark((prev) => ({ ...prev, [id]: !prev[id] }));

  const HandleAddComment = (id, text) => {
    if (!text.trim()) return;
    const newComment = {
      id,
      username: "demo",
      text,
      avatar:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
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
          {/* Debate Form */}
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
            Save Draft
          </button>

          {lastSaved && (
            <p className="text-green-600 mt-2 text-sm">
              ✅ Draft auto-saved at {new Date(lastSaved).toLocaleTimeString()}
            </p>
          )}

          {/* 📂 My Drafts Section */}
          <h3 className="mt-4">📂 My Drafts</h3>
          {drafts.length === 0 ? (
            <p className="text-gray-500">No drafts yet.</p>
          ) : (
            drafts.map((d) => (
              <div
                key={d.id}
                className="border p-2 my-2 rounded flex justify-between"
              >
                <div>
                  <h4 className="font-bold">{d.title}</h4>
                  <p className="text-sm text-gray-600">
                    Last edited: {new Date(d.updatedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editDraft(d)}>✏️ Edit</button>
                  <button onClick={() => deleteDraft(d.id)}>🗑 Delete</button>
                </div>
              </div>
            ))
          )}

          {/* Existing Posts Section */}
          <div className="posts-container mt-6">
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
