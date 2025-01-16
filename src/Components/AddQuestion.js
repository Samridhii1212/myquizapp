import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddQuestion() {
  const [formData, setFormData] = useState({
    category: "",
    difficultyLevel: "",
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted");

      // First API call
      const response1 = await axios.post("http://localhost:8080/question/add", formData);
      alert(response1.data); // Display success message from first API

      // Second API call with the same data
      const response2 = await axios.post(
        "http://localhost:8080/quiz/create",
        null, // No body data for this request
        {
          params: {
            category: formData.category, // Send the category from the form data
            numq: 1,                      // Set the number of questions (adjust as needed)
            title: "New Quiz",             // Set a static title for the quiz (or modify as needed)
          },
        }
      );
      alert(response2.data); // Display success message from second API

      // Reset form after successful submission
      setFormData({
        category: "",
        difficultyLevel: "",
        questionTitle: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        rightAnswer: 1,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add question or create quiz. Please try again.");
    }
  };

  const handleBack = () => {
    const role = localStorage.getItem("role");
    console.log(role);

    navigate("/admin"); // Redirect to the admin page if role is admin
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ backgroundColor: "#f5f5dc", minHeight: "100vh" }} // Full page height
    >
      <div className="row justify-content-center">
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

        <div className="col-md-10 col-lg-8 col-xl-6 my-5">
          <div className="card shadow-lg border-0">
            <div className="card-header text-white text-center" style={{ backgroundColor: "#552828" }}>
              <h3>Add New Question</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} style={{ color: "#552828" }}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    <strong>Category</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    placeholder="Enter category (e.g., Science, Math)"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="difficultyLevel" className="form-label">
                    <strong>Difficulty Level</strong>
                  </label>
                  <select
                    className="form-select"
                    id="difficultyLevel"
                    name="difficultyLevel"
                    value={formData.difficultyLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="questionTitle" className="form-label">
                    <strong>Question Title</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="questionTitle"
                    name="questionTitle"
                    rows="3"
                    placeholder="Enter the question text"
                    value={formData.questionTitle}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Options</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Option 1"
                    name="option1"
                    value={formData.option1}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Option 2"
                    name="option2"
                    value={formData.option2}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Option 3"
                    name="option3"
                    value={formData.option3}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Option 4"
                    name="option4"
                    value={formData.option4}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rightAnswer" className="form-label">
                    <strong>Correct Option</strong> (Enter 1, 2, 3, or 4)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="rightAnswer"
                    name="rightAnswer"
                    value={formData.rightAnswer}
                    onChange={handleChange}
                    min="1"
                    max="4"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
