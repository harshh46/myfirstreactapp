import React from "react";

const CommentCard = ({ user, comment }) => {
  return (
    <div>
      <h2>{user}</h2>
      <p>{comment}</p>
      <button>❤️</button>
    </div>
  );
};

export default CommentCard;
