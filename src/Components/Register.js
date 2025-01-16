import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", formData);
      //const role = formData.role.toLowerCase();

    const { sessionId, username ,role} = response.data;
     localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      console.log(sessionId);


      navigate(role === "admin" ? "/admin" : "/home");

    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5f5dc"}}
    >
      <div
        className="card p-3"
        style={{
          width: "450px",
          height: "auto",
          borderRadius: "20px",
          backgroundColor: "#d2b48c",
        }}
      >
        <h3 className="text-center mb-3" style={{ color: "white" }}>Register</h3>
        <form onSubmit={handleSubmit} style={{ color: "white" }}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
              style={neumorphicInputStyle}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
            <label className="form-label">Password</label>
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
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
              style={neumorphicInputStyle}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={neumorphicButtonStyle}
          >
            Register
          </button>
        </form>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/" className="text-danger">
            Login here
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
  backgroundColor: "#f0f0f3",
  borderRadius: "10px",
  padding: "10px",
  
};

const neumorphicButtonStyle = {
  border: "none",
  borderRadius: "10px",
  marginLeft:"60px",
  width:"300px",
  marginTop:"20px",
  backgroundColor:"#552828",
};

export default Register;
