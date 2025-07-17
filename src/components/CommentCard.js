import React, { useState } from "react";

const CommentCard = ({ user, comment }) => {
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLike(like + 1);
      setLiked(true);
    }
  };
  return (
    <div className="comment-card">
      <h2>{user}</h2>
      <p>
        {comment} ❤️:{like}
      </p>
      <button onClick={handleLike}>{liked ? "Liked" : "Like"}</button>
    </div>
  );
};

export default CommentCard;
