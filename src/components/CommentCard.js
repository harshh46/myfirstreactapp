import React, { useState } from "react";

const CommentCard = ({ user, comment }) => {
  const [like, setLike] = useState(0);
  return (
    <div className="comment-card">
      <h2>{user}</h2>
      <p>
        {comment} ❤️:{like}
      </p>
      <button onClick={() => setLike(like + 1)}>❤️</button>
    </div>
  );
};

export default CommentCard;
