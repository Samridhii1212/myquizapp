import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Leaderboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/quiz/getall`, {
        params: { username: localStorage.getItem("username") },
      })
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  const fetchLeaderboard = (quizId) => {
    axios
      .get(`${API_BASE_URL}/quiz/leaderboard/${quizId}`)
      .then((response) => {
        setLeaderboard(response.data);
        setSelectedQuiz(quizId);
      })
      .catch((error) => console.error("Error fetching leaderboard:", error));
  };

  const handleBackToTopics = () => {
    setSelectedQuiz(null);
    setLeaderboard([]);
  };

  const handleBack = () => {
    const role = localStorage.getItem("role");
    navigate(role === "admin" ? "/admin" : "/see-quiz");
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#68BFF5",
        minHeight: "100vh",
      }}
    >
      <button
        className="btn btn-primary position-fixed"
        style={{
          top: "20px",
          left: "20px",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          zIndex: "1000",
        }}
        onClick={handleBack}
      >
        &larr;
      </button>
      {!selectedQuiz ? (
        <>
          <h2 className="text-center mb-4" style={{ color: "#004080" }}>
            View Leaderboard by topics
          </h2>
          <div className="row justify-content-center" style={{ gap: "20px" }}>
            {quizzes.map((quiz) => (
              <div
                key={quiz.quizid}
                className="col-10 col-md-4 col-lg-3 d-flex justify-content-center"
              >
                <div
                  className="card text-center"
                  style={{
                    backgroundColor: "#EAF6FE",
                    boxShadow: "inset 5px 5px 15px #BFD5EA, inset -5px -5px 15px #FFFFFF",
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "280px",
                    padding: "20px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => fetchLeaderboard(quiz.quizid)}
                >
                  <h5
                    className="p-3 rounded"
                    style={{
                      backgroundColor: "#004080",
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {quiz.quizTitle}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2
            className="text-center mb-4"
            style={{ color: "#004080", textTransform: "uppercase" }}
          >
            Leaderboard
          </h2>
          <button
            className="btn mb-3"
            onClick={handleBackToTopics}
            style={{
              display: "block",
              margin: "0 auto 20px",
              borderRadius: "30px",
              backgroundColor: "#004080",
              color: "white",
            }}
          >
            Back to Quiz Topics
          </button>
          <div
            className="container p-4"
            style={{
              backgroundColor: "#EAF6FE",
              borderRadius: "20px",
            }}
          >
            <table
              className="table table-striped text-center"
              style={{
                color: "#004080",
              }}
            >
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((user, index) => (
                    <tr key={user.userId}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.score}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-danger">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Leaderboard;
