import React from "react";
import { Link } from "react-router-dom";
import QuizCards from "./QuizCard";

function Home() {
  return (
    <div>
      <h1>Welcome to Quiz App</h1>
      {/* <Link to="/add-question">Go to Add</Link> */}
      <QuizCards/>
      
    </div>
  );
}

export default Home;
