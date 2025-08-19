import React, { useState } from "react";

const CreateADebate = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  if (!isOpen) return null;

  const handleClick = () => {
    console.log({ title, description, category });
    setTitle("");
    setDescription("");
    category("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ❌
        </button>

        <h2>Create A Debate</h2>
        <input
          type="text"
          placeholder="Debate title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Debate description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="Politics">Politics</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
        </select>
        <button onClick={handleClick}> Submit </button>
      </div>
    </div>
  );
};

export default CreateADebate;
