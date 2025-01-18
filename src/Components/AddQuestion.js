import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddQuestions() {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [quizExists, setQuizExists] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [validationError, setValidationError] = useState({}); 
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const handleCategoryChange = async (e) => {
    const categoryValue = e.target.value;
    setCategory(categoryValue);
    setErrorMessage("");

    try {
      const quizCheckResponse = await axios.get(`${API_BASE_URL}/quiz/check`, {
        params: { category: categoryValue },
      });

      if (quizCheckResponse.data) {
        setQuizExists(true);
        setErrorMessage("A quiz already exists for this category.");
        setIsFormDisabled(true);
      } else {
        setQuizExists(false);
        setIsFormDisabled(false);
      }
    } catch (error) {
      console.error("Error checking quiz existence:", error);
    }
  };

  const handleNumQuestionsChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumQuestions(count);

    const initialQuestions = Array.from({ length: count }, (_, index) => ({
      questionTitle: "",
      options: ["", "", "", ""],
      rightAnswer: 1,
    }));
    setQuestions(initialQuestions);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    const errors = { ...validationError };

    if (field === "options") {
      updatedQuestions[index].options = value;
    } else if (field === "rightAnswer") {
      const answer = parseInt(value, 10);
      updatedQuestions[index][field] = answer;

      if (answer < 1 || answer > 4) {
        errors[index] = "Correct option must be between 1 and 4.";
      } else {
        delete errors[index];
      }
    } else {
      updatedQuestions[index][field] = value;
    }

    setValidationError(errors); 
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quizExists) {
      alert("Quiz for this category already exists.");
      return;
    }

    if (Object.keys(validationError).length > 0) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const addQuestionsResponse = await axios.post(`${API_BASE_URL}/question/add`, {
        category,
        questions,
      });

      alert(addQuestionsResponse.data);

      const createQuizResponse = await axios.post(`${API_BASE_URL}/quiz/create`, null, {
        params: {
          category,
          numq: numQuestions,
          title: `${category} Quiz`,
        },
      });

      alert(createQuizResponse.data);

      setNumQuestions(0);
      setCategory("");
      setQuestions([]);
    } catch (error) {
      console.error("Failed to add questions or create quiz:", error);
      alert("Failed to add questions or create quiz.");
    }
  };

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#68BFF5",
        minHeight: "100vh",
        paddingTop: "5rem",
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

      <div
        className="mx-auto p-4 rounded-lg shadow-lg"
        style={{
          backgroundColor: "#EAF6FE",
          maxWidth: "600px",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center text-primary mb-4">Add Questions to Quiz</h2>

        <div className="mb-3">
          <label htmlFor="category" className="form-label text-primary">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={handleCategoryChange}
            required
            style={{
              boxShadow: "inset 5px 5px 15px #BFD5EA, inset -5px -5px 15px #FFFFFF",
              backgroundColor: "white",
              border: "1px solid #ccc",
            }}
          />
          {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="numQuestions" className="form-label text-primary">
            Number of Questions
          </label>
          <input
            type="number"
            id="numQuestions"
            className="form-control"
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            min="1"
            required
            style={{
              boxShadow: "inset 5px 5px 15px #BFD5EA, inset -5px -5px 15px #FFFFFF",
              backgroundColor: "white",
              border: "1px solid #ccc",
            }}
            disabled={isFormDisabled}
          />
        </div>

        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <h5 className="text-primary">Question {index + 1}</h5>
              <div className="mb-2">
                <label className="text-primary">Question Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={q.questionTitle}
                  onChange={(e) =>
                    handleChange(index, "questionTitle", e.target.value)
                  }
                  required
                  style={{
                    boxShadow: "inset 5px 5px 15px #BFD5EA, inset -5px -5px 15px #FFFFFF",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                  disabled={isFormDisabled}
                />
              </div>
              <div className="mb-2 text-primary">
                <label>Options</label>
                {q.options.map((option, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    className="form-control mb-2"
                    placeholder={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...q.options];
                      updatedOptions[optIndex] = e.target.value;
                      handleChange(index, "options", updatedOptions);
                    }}
                    required
                    style={{
                      boxShadow: "inset 5px 5px 15px #BFD5EA, inset -5px -5px 15px #FFFFFF",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                    }}
                    disabled={isFormDisabled}
                  />
                ))}
              </div>
              <div className="mb-2">
                <label className="text-primary">Correct Option (1-4)</label>
                <input
                  type="number"
                  className="form-control"
                  value={q.rightAnswer}
                  onChange={(e) =>
                    handleChange(index, "rightAnswer", parseInt(e.target.value, 10))
                  }
                  min="1"
                  max="4"
                  required
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ccc",
                  }}
                  disabled={isFormDisabled}
                />
                {validationError[index] && (
                  <div className="text-danger mt-1">{validationError[index]}</div>
                )}
              </div>
            </div>
          ))}

          {numQuestions > 0 && !quizExists && (
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Submit Questions
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddQuestions;
