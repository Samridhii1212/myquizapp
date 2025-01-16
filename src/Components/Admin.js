import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      alert("Please log in to access the admin page.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLeaderboard = () => {
    navigate("/leaderboard"); // Navigate to leaderboard page
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
      style={{ backgroundColor: "#f5f5dc", position: "relative" }}
    >
      {/* Logout Button */}
         <button
        onClick={handleLeaderboard}
        className="btn  position-fixed"
        style={{
          top: "20px",
          left: "20px",
           backgroundColor:"#552828",
           color:"white",
          padding: "10px 20px", // Add padding to give it a logo-style button shape
          borderRadius: "30px", // Slightly rounded edges to resemble a logo-style button
          boxShadow: "3px 3px 8px #d1d9e6, -3px -3px 8px #ffffff",
          zIndex: "1000",
          fontSize: "16px", // Text size for logo style
          fontWeight: "600", // Bold text for emphasis
        }}
      >
        Leaderboard
      </button>
      <button
        onClick={handleLogout}
        className="btn btn-danger position-absolute"
        style={{
          top: "20px",
          right: "20px",
          boxShadow: "5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff",
        }}
      >
        Logout
      </button>

      {/* Admin Panel */}
      <div
        className="row text-center"
        style={{
          width: "100%",
          maxWidth: "400px",
          color:"white",
           backgroundColor: "#d2b48c",
          borderRadius: "20px",
          boxShadow: "5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff",
          padding: "20px",
        }}
      >
        <h2 className="mb-4">Admin Panel</h2>

        {/* Add Question Button */}
        <div className="col-12 mb-3">
          <button
            onClick={handleAddQuestion}
            className="btn btn-primary w-100 py-3"
            style={{
              borderRadius: "15px",
             
              fontWeight: "bold",
              backgroundColor:"#552828",
            }}
          >
            Add Question
          </button>
        </div>

        {/* View Users Button */}
        <div className="col-12">
          <button
            onClick={handleViewUsers}
            className="btn btn-secondary w-100 py-3"
            style={{
              borderRadius: "15px",
            
              fontWeight: "bold",
               backgroundColor:"green"

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
