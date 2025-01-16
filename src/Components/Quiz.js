import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/quiz/get/${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const submitQuiz = async () => {
    try {
      const response = await axios.post(`/quiz/submit/${id}`, responses);
      alert(`Your score: ${response.data}`);
    } catch (error) {
      console.error("Error submitting quiz", error);
    }
  };

  const handleResponse = (questionId, answer) => {
    setResponses((prev) => {
      const updated = [...prev];
      const existing = updated.find((r) => r.questionId === questionId);
      if (existing) {
        existing.givenAnswer = answer;
      } else {
        updated.push({ questionId, givenAnswer: answer });
      }
      return updated;
    });
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f5f5dc", minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4 my-5">
          <div className="card shadow-lg border-0" style={{ backgroundColor: "#f0e1b6" }}>
            <div className="card-header text-white text-center" style={{ backgroundColor: "#6b4f31" }}>
              <h3>Take Quiz</h3>
            </div>
            <div className="card-body" style={{ color: "#6b4f31" }}>
              {questions.map((q) => (
                <div key={q.id} className="mb-4">
                  <h5>{q.question}</h5>
                  {q.options.map((option, idx) => (
                    <div key={idx} className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={q.id}
                        value={option}
                        onChange={() => handleResponse(q.id, option)}
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>
              ))}
              <div className="d-grid">
                <button onClick={submitQuiz} className="btn btn-success" style={{ borderRadius: "10px" }}>
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
