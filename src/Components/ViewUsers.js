import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users
    axios
      .get("http://localhost:8080/api/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleUserClick = (userId) => {
    axios
      .get(`http://localhost:8080/api/users/${userId}`)
      .then((response) => {
        setScores(response.data);
        setSelectedUser(userId);
      })
      .catch((error) => {
        console.error("Error fetching user scores:", error);
      });
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setScores([]);
  };

    const handleBack = () => {
    const role = localStorage.getItem("role");
    console.log(role)
    
      navigate("/admin"); // Redirect to the admin page if role is admin
    
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
       
        backgroundColor: "#f5f5dc", // Beige background
        minHeight: "100vh",
    
      }}
    >

      {!selectedUser ? (
        <>
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


          <h2 className="text-center mb-4" style={{ color: "#552828" }}>
            All Users
          </h2>
          <div className="container p-4" style={{color:"#552828"}}>
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn"
                        style={{ backgroundColor:"#552828",color:"white"}}
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
        </>
      ) : (
        <>
          <h2 className="text-center mb-4" style={{ color: "#7269AC" }}>
            Scores for User ID: {selectedUser}
          </h2>
          <button
            className="btn btn-secondary mb-3"
            onClick={handleBackToUsers}
            style={{
              display: "block",
              margin: "0 auto 20px",
              borderRadius: "20px",
              backgroundColor: "#552828",
              color: "white",
              boxShadow: "3px 3px 8px #d1d9e6, -3px -3px 8px #ffffff",
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
