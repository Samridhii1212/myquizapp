import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", formData);
      const { role, sessionId, username } = response.data;

      // Save session details in localStorage
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      // Redirect based on the user's role
      if (role.toLowerCase() === "admin") {
        window.location.href = "/admin"; // Redirect to Admin page
      } else {
        window.location.href = "/see-quiz"; // Redirect to Quiz page
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5f5dc" }} // Light brown background
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "350px",
          borderRadius: "20px",
          boxShadow: "5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff",
          backgroundColor: "#d2b48c", // Light yellow background for card
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "white" }}>Login</h2> {/* Light brown color */}
        <form onSubmit={handleSubmit} style={{ color: "white" }}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "white" }}>Email</label> {/* Light brown color */}
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              style={neumorphicInputStyle}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "white" }}>Password</label> {/* Light brown color */}
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              style={neumorphicInputStyle}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            style={neumorphicButtonStyle}
          >
            Login
          </button>
        </form>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

        <p className="text-center mt-3">
          New user?{" "}
          <a href="/register" className="text-danger">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

const neumorphicInputStyle = {
  border: "none",
  outline: "none",
  boxShadow: "inset 5px 5px 15px #d1d9e6, inset -5px -5px 15px #ffffff",
  backgroundColor: "#F9F9F0", // Light yellow background
  borderRadius: "10px",
  padding: "10px",
};

const neumorphicButtonStyle = {
  border: "none",
  borderRadius: "10px",
  marginLeft: "70px",
  width: "150px",
  marginTop: "20px",
  backgroundColor: "#552828", // Light brown button
};

export default Login;
