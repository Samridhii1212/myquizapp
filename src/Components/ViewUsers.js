import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function ViewUsers() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    axios
      .get(`${API_BASE_URL}/api/users/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        alert("Error fetching users:", error);
      });
  }, []);

  const handleUserClick = (userId) => {
    axios
      .get(`${API_BASE_URL}/api/users/${userId}`)
      .then((response) => {
        setScores(response.data);
        setSelectedUser(userId);
      })
      .catch((error) => {
        alert("Error fetching user scores:", error);
      });
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setScores([]);
  };

  const handleBack = () => {
    navigate("/admin");
  };

  const admins = users.filter((user) => user.role === "admin");
  const nonAdmins = users.filter((user) => user.role !== "admin");

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#68BFF5",
        minHeight: "100vh",
      }}
    >
      <button
        className="btn btn-success position-fixed"
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

      {!selectedUser ? (
        <>
          <h2 className="text-center mb-4" style={{ color: "#004080" }}>
            All Users
          </h2>

          
          {admins.length > 0 && (
            <div className="container p-4">
              <h3 className="text-center" style={{ color: "white" }}>
                Admin Users
              </h3>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.id}</td>
                      <td>{admin.username}</td>
                      <td>{admin.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          
          {nonAdmins.length > 0 && (
            <div className="container p-4">
              <h3 className="text-center" style={{ color: "white"  }}>
                Non-Admin Users
              </h3>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nonAdmins.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#004080",
                            color: "white",
                          }}
                          onClick={() => handleUserClick(user.id)}
                        >
                          View Scores
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-center mb-4" style={{ color: "#004080" }}>
            Scores for User ID: {selectedUser}
          </h2>
          <button
            className="btn btn-secondary mb-3"
            onClick={handleBackToUsers}
            style={{
              display: "block",
              margin: "0 auto 20px",
              borderRadius: "20px",
              backgroundColor: "#004080",
              color: "white",
            }}
          >
            Back to Users
          </button>
          <div className="container p-4">
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Quiz Title</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.length > 0 ? (
                  scores.map((score, index) => (
                    <tr key={index}>
                      <td>{score.quizTitle}</td>
                      <td>{score.score}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-danger">
                      No scores available for this user.
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

export default ViewUsers;
