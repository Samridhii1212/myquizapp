import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function QuestionPage() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/quiz/get/${id}`, { params: { username } })
      .then((response) => {
        if (response.data.questions) {
          setQuizData(response.data.questions);
          setAlreadyAttempted(response.data.alreadyAttempted);
          const initialSelectedOptions = {};
          response.data.questions.forEach((question) => {
            initialSelectedOptions[question.questionId] =
              question.selectedOption > 0 ? question.selectedOption : null;
          });
          setSelectedOptions(initialSelectedOptions);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate("/see-quiz");
  };

  const handleOptionSelect = (questionId, optionInd) => {
    if (!alreadyAttempted) {
      setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: optionInd,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responses = quizData.map((question) => ({
      questionid: question.questionId,
      answergiven: selectedOptions[question.questionId] || null,
    }));

    axios
      .post(
        `${API_BASE_URL}/quiz/submit/${id}`,
        responses,
        {
          params: { username: localStorage.getItem("username") },
        }
      )
      .then((response) => {
        setScore(response.data);
      })
      .catch((error) => {});
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

  if (!quizData || quizData.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <p className="text-danger fs-4">No questions available for this quiz.</p>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#68BFF5",
        borderRadius: "15px",
        padding: "30px",
        minWidth: "100vw",
        minHeight: "100vh",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button
        className="btn btn-secondary mb-4"
        onClick={handleBack}
        style={{
          backgroundColor: "green",
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
          {quizData.map((question, index) => (
            <div
              key={question.questionId}
              className="mb-4 mx-auto p-4"
              style={{
                maxWidth: "700px",
                border: `2px solid #11384e`,
                borderRadius: "15px",
                backgroundColor: "#EAF6FE",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h5 className="text-center mb-3" style={{ color: "#6b4f31" }}>
                {index + 1}. {question.questionTitle}
              </h5>
              <div>
                {[question.option1, question.option2, question.option3, question.option4].map(
                  (option, optionIndex) => {
                    const isSelected =
                      selectedOptions[question.questionId] === optionIndex + 1;
                    const isCorrect = question.correctAns === optionIndex + 1;
                    const isAttempted = question.selectedOption > 0;
                    return (
                      <div
                        key={optionIndex}
                        className={`p-3 mb-3 rounded text-center ${
                          isSelected
                            ? isCorrect
                              ? "bg-success text-white"
                              : "bg-danger text-white"
                            : "bg-light text-dark"
                        }`}
                        style={{
                          cursor: isAttempted ? "not-allowed" : "pointer",
                          border: `1px solid #6b4f31`,
                          borderRadius: "20px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          opacity: isAttempted && !isSelected ? 0.6 : 1,
                        }}
                        onClick={() =>
                          !isAttempted && handleOptionSelect(question.questionId, optionIndex + 1)
                        }
                      >
                        {option}
                        {isSelected && !isCorrect && (
                          <span
                            className="ms-2"
                            style={{
                              color: "red",
                              fontSize: "1.2rem",
                            }}
                          >
                            ❌
                          </span>
                        )}
                        {isCorrect && !isSelected && (
                          <span
                            className="ms-2"
                            style={{
                              color: "green",
                              fontSize: "1.2rem",
                            }}
                          >
                            ✔️
                          </span>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-success"
              style={{
                padding: "10px 25px",
                borderRadius: "25px",
                fontSize: "16px",
                backgroundColor: "#004080",
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
