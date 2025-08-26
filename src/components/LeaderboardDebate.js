import React, { useState } from "react";

const LeaderboardDebate = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const post = [
    { id: 1, name: "Harsh", points: 1000 },
    { id: 2, name: "Manas", points: 800 },
    { id: 3, name: "Advait", points: 600 },
    { id: 4, name: "Raj", points: 500 },
    { id: 5, name: "Nishant", points: 300 },
    { id: 6, name: "Saloni", points: 200 },
  ];
  const getBadge = (rank) => {
    if (rank === 1) return "👑";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };
  return (
    <div>
      <div>
        <button onClick={() => setShowLeaderboard(!showLeaderboard)}>
          {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}{" "}
        </button>

        {showLeaderboard && (
          <div className="leader-debate">
            <div style={{ display: "flex", marginLeft: "15px", gap: "10px" }}>
              <h2>Rank</h2>
              <h2>Name</h2>
              <h2>Points</h2>
            </div>
            {post.map((p) => (
              <div key={p.id} className="leader">
                <h3 style={{ marginLeft: "10px" }}>
                  {p.id}
                  {". "}
                  {p.id === 1
                    ? "👑"
                    : p.id === 2
                    ? "🥈"
                    : p.id === 3
                    ? "🥉"
                    : p.id + "th"}
                </h3>
                <h3>{p.name}</h3>
                <h3>{p.points}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardDebate;
