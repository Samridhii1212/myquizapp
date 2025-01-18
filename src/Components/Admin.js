import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      alert("Please log in to access the admin page.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLeaderboard = () => {
    navigate("/leaderboard"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleAddQuestion = () => {
    navigate("/add-question");
  };

  const handleViewUsers = () => {
    navigate("/viewUsers");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#68BFF5", position: "relative" }} 
    >
    
      <button
        onClick={handleLeaderboard}
        className="btn position-fixed"
        style={{
          top: "20px",
          left: "20px",
          backgroundColor: "green",
          color: "black",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: "1000",
        }}
      >
        Leaderboard
      </button>

      
      <button
        onClick={handleLogout}
        className="btn btn-danger position-fixed"
        style={{
          top: "20px",
          right: "20px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        Logout
      </button>

     
      <div
        className="text-center"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#EAF6FE", 
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2 className="mb-4 text-dark">Admin Panel</h2>

      
        <div className="mb-3">
          <button
            onClick={handleAddQuestion}
            className="btn w-100 py-2"
            style={{
              borderRadius: "5px",
              fontWeight: "bold",
              color:"white",
               backgroundColor: "#004080", 
             
            }}
          >
            Add Question
          </button>
        </div>

        
        <div>
          <button
            onClick={handleViewUsers}
            className="btn btn-success w-100 py-2"
            style={{
              borderRadius: "5px",
              fontWeight: "bold",
              backgroundColor: "#28a745", 
            }}
          >
            View Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
