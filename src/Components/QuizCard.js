import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function QuizCards() {
  const [quizzes, setQuizzes] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quizzes from the backend
    axios
      .get("http://localhost:8080/quiz/getall", {
        params: { username },
      })
      .then((response) => {
        console.log(response);
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, [username]);

  const handleQuizSelect = (quizid) => {
    navigate(`/quiz/${quizid}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#f5f5dc", // Beige background
        minHeight: "100vh",
      }}
    >
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button
          onClick={() => navigate("/leaderboard")}
          className="btn btn-success"
          style={{
            borderRadius: "30px",
            padding: "10px 20px",
            fontWeight: "600",
            boxShadow: "3px 3px 8px #d1d9e6, -3px -3px 8px #ffffff",
          }}
        >
          Leaderboard
        </button>

        <button
          onClick={handleLogout}
          className="btn btn-danger"
          style={{
            borderRadius: "30px",
            padding: "10px 20px",
            fontWeight: "600",
            boxShadow: "3px 3px 8px #d1d9e6, -3px -3px 8px #ffffff",
          }}
        >
          Logout
        </button>
      </div>

      {/* Welcome Section */}
      <h1
        className="text-center text-info mx-auto mb-4"
        style={{ fontWeight: "600", fontSize: "1.75rem" }} // Smaller font and different color for welcome
      >
        Welcome, {username}!
      </h1>

      {/* Quiz Cards Section */}
      <h2 className="text-center mb-4" style={{ color: "#495057", fontWeight: "600" }}>
        Explore Quizzes
      </h2>
      <div className="row justify-content-center" style={{ gap: "30px" }}>
        {quizzes.map((quiz) => (
          <div key={quiz.quizid} className="col-md-4 col-lg-3">
            <div
              className="card border-0 shadow-lg"
              style={{
                backgroundColor: "#d2b48c", // Light brown card background
                borderRadius: "20px",
                overflow: "hidden",
                width: "280px", // Decreased width of card
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "8px 8px 20px rgba(140, 70, 140, 0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "5px 5px 15px rgba(140, 70, 140, 0.3)";
              }}
            >
              <div className="card-body text-center">
                {/* Quiz Title */}
               <h4
  className="card-title mb-3"
  style={{
    fontSize: "1.5rem", // Increased font size
    fontWeight: "700",
    color: "yellow",
    fontFamily: "'Cursive', 'Arial', sans-serif", // Cursive font with fallback
    textTransform: "uppercase", // Uppercase text
  }}
>
  {quiz.quizTitle}
</h4>

                {/* Details */}
                <p className="card-text text-white mb-3" style={{ fontSize: "1.25rem" }}>
                  <strong>Questions:</strong> {quiz.questions.length}
                </p>
                <p
                  className="card-text"
                  style={{
                    color: "#CC0A0A", // Red color for the score
                    fontSize: "1.75rem", // Increased size for score
                    fontWeight: "bold",
                  }}
                >
                  Score: {quiz.score ?? 0}
                </p>
                {/* Attempt Button */}
                <button
                  className="btn btn-outline-success w-100 mt-3"
                  onClick={() => handleQuizSelect(quiz.quizid)}
                  style={{
                    borderRadius: "30px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    padding: "10px",
                  }}
                >
                  Attempt Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizCards;
