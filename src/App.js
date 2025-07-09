import logo from "./logo.svg";
import "./App.css";
// import Hello from "./components/Hello.js";
// import Counter from "./components/Counter.js";
// import Feedback from "./components/Feedback.js";
import CommentCard from "./components/CommentCard.js";

function App() {
  return (
    <div>
      {/* <Hello /> */}
      {/* <Counter />
      <Feedback /> */}
      <CommentCard user="Harsh" comment="I like React" />
      <CommentCard user="John" comment="I like JavaScript" />
      <CommentCard user="Joe" comment="I like Games" />
    </div>
  );
}

export default App;
