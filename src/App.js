import logo from "./logo.svg";
import "./index.css";
// import Hello from "./components/Hello.js";
// import Counter from "./components/Counter.js";
// import Feedback from "./components/Feedback.js";
// import CommentCard from "./components/CommentCard.js";
import NewComment from "./components/NewComment.js";
import DebateDetails from "./components/Debate.js";
import DebatePost from "./components/DebatePost.js";

function App() {
  const demoComments = [
    { user: "Harsh", comment: "I like React" },
    { user: "John", comment: "I like JavaScript" },
    { user: "Joe", comment: "I like Games" },
  ];
  return (
    <div>
      {/* <Hello /> */}
      {/* <Counter />
      <Feedback /> */}
      {/* <CommentCard  /> */}
      {/* <NewComment comments={demoComments} /> */}
      {/* <DebateDetails /> */}
      <DebatePost />
    </div>
  );
}

export default App;
