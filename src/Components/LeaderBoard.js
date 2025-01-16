import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Leaderboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizname, setQuizname] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quizzes from the backend
    axios
      .get("http://localhost:8080/quiz/getall", {
        params: { username: localStorage.getItem("username") }, // Sending the username as a request parameter
      })
      .then((response) => {
        console.log(response);
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  const fetchLeaderboard = (quizId) => {
    axios
      .get(`http://localhost:8080/quiz/leaderboard/${quizId}`)
      .then((response) => {
        console.log(response.data);
        setLeaderboard(response.data);
        setSelectedQuiz(quizId);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
      });
  };

  const handleBackToTopics = () => {
    setSelectedQuiz(null);
    setLeaderboard([]);
  };

  const handleBack = () => {
    const role = localStorage.getItem("role");
    console.log(role);
    if (role === "admin") {
      navigate("/admin"); // Redirect to the admin page if role is admin
    } else if (role === "user") {
      navigate("/see-quiz"); // Redirect to quiz card page for non-admin users
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#f5f5dc", // Beige background
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <button
        className="btn btn-success position-fixed"
        style={{
          top: "20px",
          left: "20px",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          boxShadow: "3px 3px 8px #d1d9e6, -3px -3px 8px #ffffff",
          zIndex: "1000",
        }}
        onClick={handleBack}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          &larr;
        </span>
      </button>

      {!selectedQuiz ? (
        <>
          <h2 className="text-center mb-4" style={{ color: "red" }}>
            Quiz Topics
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
                    backgroundColor: "#d2b48c", // Light brown card background
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "280px",
                    padding: "20px",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0px 4px 15px rgba(210, 180, 140, 0.6)"; // Light brown shadow effect
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none"; // Remove the shadow effect when the mouse leaves
                  }}
                  onClick={() => fetchLeaderboard(quiz.quizid)}
                >
                  <h5
                    className="p-3 rounded"
                    style={{
                      backgroundColor: "#552828", // Dark brown background for quiz title
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: "500",
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
            style={{ color: "red", textTransform: "uppercase" }}
          >
            Leaderboard
          </h2>

          <button
            className="btn btn-outline-light mb-3"
            onClick={handleBackToTopics}
            style={{
              display: "block",
              margin: "0 auto 20px",
              borderRadius: "30px",
              backgroundColor: "#552828",
              color: "white",
              boxShadow: "3px 3px 8px #d1d9e6, -3px -3px 8px #ffffff",
            }}
          >
            Back to Quiz Topics
          </button>

          <div
            className="container p-4"
            style={{
              // Light brown background for leaderboard table
              borderRadius: "20px",
             
            }}
          >
            <table
              className="table table-striped text-center"
              style={{
                backgroundColor: "#f0f0f3", // Light beige background for table
                borderRadius: "10px",
                overflow: "hidden",
                color: "#7269AC",
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
                    <tr
                      key={user.userId}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#d2b48c" : "#f0f0f3", // Light brown strip
                      }}
                    >
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
