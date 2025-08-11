import React from "react";

const UserSuggestion = ({ profilePic, name, username }) => {
  return (
    <div className="card-style">
      <img style={{ marginLeft: "30px" }} src={profilePic} alt={name} />
      <div>
        <h3 style={{ textAlign: "center" }}>{name}</h3>
        <p style={{ textAlign: "center" }}>@{username}</p>
      </div>
      <button className="follow-button">Follow</button>
    </div>
  );
};

export default UserSuggestion;
