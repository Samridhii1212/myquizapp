import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function QuestionPage() {
  const { id } = useParams(); // Access quizId from URL
  const [quizData, setQuizData] = useState(null); // Store quiz data
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedOptions, setSelectedOptions] = useState({}); // Store selected options
  const [score, setScore] = useState(null); // Store quiz score
  const navigate = useNavigate();

  const username=localStorage.getItem("username")

  useEffect(() => {
    axios
      .get(`http://localhost:8080/quiz/get/${id}`,{
        params: {username},
      })
      .then((response) => {
        console.log("Fetched quiz data:", response.data); // Check full response structure
        if (response.data) {
          setQuizData(response.data); // Set quiz data
        } else {
          console.error("No questions found in the response data");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate("/see-quiz"); // Go back to the quizzes list page
  };

  const handleOptionSelect = (questionId, optionind) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionind,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responses = quizData.map((question) => ({
      questionid: question.questionId,
      answergiven: selectedOptions[question.questionId] || null,
    }));

    console.log(responses)
    axios
      .post(`http://localhost:8080/quiz/submit/${id}`, responses,
      {
        params: { username: localStorage.getItem("username")}, // Sending the username as request parameter
      })
      .then((response) => {
        console.log("Quiz submitted successfully:", response.data);
        setScore(response.data); // Set the score received from the backend
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center vh-100"
        style={{ backgroundColor: "#f5f5dc" }}
      >
        <p className="text-primary fs-4">Loading quiz...</p>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#f5f5dc",
        borderRadius: "15px",
        padding: "30px",
        minWidth:"100vw",
        minHeight:"100vh",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button
        className="btn btn-secondary mb-4"
        onClick={handleBack}
        style={{
          backgroundColor: "#6b4f31",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "25px",
        }}
      >
        Back to Quizzes
      </button>

      {score === null ? (
        <form onSubmit={handleSubmit}>
          {quizData.length > 0 ? (
            quizData.map((question, index) => (
              <div
                key={question.questionId}
                className="mb-4 mx-auto p-4"
                style={{
                  maxWidth: "700px",
                  border: `2px solid #6b4f31`,
                  borderRadius: "15px",
                  backgroundColor: "#f0e1b6",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h5 className="text-center mb-3" style={{ color: "#6b4f31" }}>
                  {index + 1}. {question.questionTitle}
                </h5>
                <div>
                  {[question.option1, question.option2, question.option3, question.option4].map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`p-3 mb-3 rounded text-center ${
                          selectedOptions[question.questionId] === index + 1
                            ? "bg-success text-white"
                            : "bg-light text-dark"
                        }`}
                        style={{
                          cursor: "pointer",
                          border: `1px solid #6b4f31`,
                          borderRadius: "20px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={() => handleOptionSelect(question.questionId, index + 1)} // Send 1-based index
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-danger text-center">No questions available for this quiz.</p>
          )}

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-success"
              style={{
                padding: "10px 25px",
                borderRadius: "25px",
                fontSize: "16px",
                backgroundColor: "#6b4f31",
              }}
            >
              Submit Quiz
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <h3 style={{ color: "#6b4f31", fontSize: "2rem" }}>Your Score: {score}</h3>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
