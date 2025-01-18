import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import AddQuestion from "./Components/AddQuestion";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizCards from "./Components/QuizCard";
import QuestionPage from "./Components/QuestionPage";
import Login from "./Login";
import Register from "./Components/Register";
import Leaderboard from "./Components/LeaderBoard";
import ViewUsers from "./Components/ViewUsers";

const App = () => {
  const sessionId = localStorage.getItem("sessionId");
  const role = localStorage.getItem("role"); 

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Leaderboard Accessible to All Logged-In Users */}
        {sessionId && (
          <Route path="/leaderboard" element={<Leaderboard />} />
        )}

        {/* Admin Routes */}
        {role === "admin" && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/viewUsers" element={<ViewUsers />} />
            <Route path="*" element={<Login/>}/>
          </>
        )}

        {/* User Routes */}
        {role === "user" && (
          <>
           
            <Route path="/quiz/:id" element={<QuestionPage />} />
            <Route path="/see-quiz" element={<QuizCards />} />
            <Route path="*" element={<Login/>} />
          </>
        )}

        {/* Default Fallback for Unauthenticated Users */}
        {!sessionId && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};

export default App;
