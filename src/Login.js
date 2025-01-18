import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
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
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
      const { role, sessionId, username } = response.data;
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      if (role.toLowerCase() === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/see-quiz";
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#68BFF5" }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "350px",
          borderRadius: "20px",
          boxShadow: "5px 5px 15px #BFD5EA, -5px -5px 15px #FFFFFF",
          backgroundColor: "#EAF6FE",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#004080" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#004080" }}>Email</label>
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
            <label className="form-label" style={{ color: "#004080" }}>Password</label>
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
            className="btn btn-primary"
            style={neumorphicButtonStyle}
          >
            Login
          </button>
        </form>
        {errorMessage && (
          <p className="text-danger mt-3 text-center">{errorMessage}</p>
        )}
        <p className="text-center mt-3" style={{ color: "#004080" }}>
          New user?{" "}
          <a href="/register" className="text-primary">
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
  boxShadow: "inset 5px 5px 15px #BFD5EA, inset -5px -5px 15px #FFFFFF",
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "10px",
};

const neumorphicButtonStyle = {
  border: "none",
  borderRadius: "10px",
  marginLeft: "70px",
  width: "150px",
  marginTop: "20px",
  backgroundColor: "#004080",
  color: "white",
  boxShadow: "4px 4px 10px #BFD5EA, -4px -4px 10px #FFFFFF",
};

export default Login;
