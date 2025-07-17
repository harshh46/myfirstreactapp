import React, { useState } from "react";
import CommentCard from "./CommentCard";

const NewComment = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [allComments, setAllComments] = useState(comments);

  const handlePost = (e) => {
    e.preventDefault();
    if (userName.trim() && newComment.trim()) {
      const newEntry = {
        user: userName,
        comment: newComment,
      };
      setAllComments([newEntry, ...allComments]);
      setNewComment("");
      setUserName("");
    }
  };

  return (
    <div className="comment-box">
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="text "
          placeholder="Enter Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <div className="comment-list">
        <h3>All Comments</h3>
        {allComments.map((c, index) => (
          <CommentCard key={index} user={c.user} comment={c.comment} />
        ))}
      </div>
    </div>
  );
};

export default NewComment;
