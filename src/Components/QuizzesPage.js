import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate=useNavigate();
 

  // Fetching quizzes from backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/quiz/getall"); // Adjust API endpoint as necessary
        console.log(response)
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId) => {
    setSelectedQuiz(quizId);
    navigate(`/quiz/${quizId}`); // Navigate to questions page for selected quiz
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Available Quizzes</h2>
          <div className="list-group">
            {quizzes.map((quiz) => (
              <button
                key={quiz.quizId}
                className="list-group-item list-group-item-action"
                onClick={() => handleQuizClick(quiz.quizId)}
              >
                {quiz.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizzesPage;
