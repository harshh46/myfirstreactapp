import React from "react";
import UserSuggestion from "./UserSuggestion";
const Sidebar = () => {
  const suggestions = [
    {
      id: 1,
      profilePic: "/images/pf1.jpg",
      name: "John Wick",
      username: "John The Don",
    },
    {
      id: 2,
      profilePic: "/images/pf2.jpg",
      name: "Ronnie coleman",
      username: "Gym Rat",
    },
    {
      id: 3,
      profilePic: "/images/pf3.jpg",
      name: "Danny daniels",
      username: "Danny Danny",
    },
    {
      id: 1,
      profilePic: "/images/pf4.jpg",
      name: "Alice Johnson",
      username: "Alice Angel",
    },
    {
      id: 5,
      profilePic: "/images/pf5.jpg",
      name: "Janhvi Kapoor",
      username: "Baby Girl",
    },
  ];
  return (
    <aside className="sidebar">
      <h3 style={{ textAlign: "center" }}>People you may know</h3>
      {suggestions.map((user) => (
        <UserSuggestion
          key={user.id}
          profilePic={user.profilePic}
          name={user.name}
          username={user.username}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
