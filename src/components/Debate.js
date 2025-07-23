import React from "react";

const DebateDetails = () => {
  return (
    <div className="debate-container">
      <h1 className="debate-title">Eating junk food is healthy or not?</h1>

      <div className="debate-meta">
        <span className="debate-user">@harshraval</span>
        <span className="debate-name">Harsh Raval</span>
        <span className="debate-date">Posted on July 23, 2025 at 4:00 PM</span>
      </div>

      <div className="debate-content">
        <p>
          About junk food. It causes many health issues like Stomachache,
          Diarrhea, etc
        </p>
      </div>

      <div className="debate-actions">
        <button className="like-btn">👍 Like</button>
        <button className="comment-btn">💬 Comment</button>
      </div>
    </div>
  );
};

export default DebateDetails;
