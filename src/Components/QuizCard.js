import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function QuizCards() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [quizzes, setQuizzes] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/quiz/getall`, {
        params: { username },
      })
      .then((response) => {
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
        backgroundColor: "#68BFF5",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button
          onClick={() => navigate("/leaderboard")}
          className="btn btn-success"
          style={{
            borderRadius: "30px",
            padding: "10px 20px",
            fontWeight: "600",
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
          }}
        >
          Logout
        </button>
      </div>
      <h1
        className="text-center mx-auto mb-4"
        style={{
          fontWeight: "600",
          fontSize: "1.75rem",
          color: "darkblue",
        }}
      >
        Welcome , {username}! Explore Quizzes
      </h1>
    
      <div className="row justify-content-center" style={{ gap: "30px" ,marginTop:"50px"}}>
        {quizzes.map((quiz) => (
          <div key={quiz.quizid} className="col-md-4 col-lg-3">
            <div
              className="card border-0"
              style={{
                backgroundColor: "#EAF6FE",
                borderRadius: "20px",
                overflow: "hidden",
                width: "280px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div className="card-body text-center">
                <h4
                  className="card-title mb-3"
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "600",
                    color: "darkblue",
                    fontFamily: "gabriola",
                    textTransform: "uppercase",
                  }}
                >
                  {quiz.quizTitle}
                </h4>
                <p className="card-text text-dark mb-3" style={{ fontSize: "1.25rem" }}>
                  <strong>Questions:</strong> {quiz.questions.length}
                </p>
                <p
                  className="card-text"
                  style={{
                    color: "red",
                    fontSize: "1.75rem",
                    fontWeight: "bold",
                  }}
                >
                  Score: {quiz.score ?? 0}
                </p>
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => handleQuizSelect(quiz.quizid)}
                  style={{
                    borderRadius: "30px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    padding: "10px",
                    backgroundColor: "#45A45C",
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
