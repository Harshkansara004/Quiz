import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10');
      const data = response.data.results;
      setQuestions(data);
      setUserAnswers(new Array(data.length).fill(null));
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleAnswerChange = (event) => {
    const answer = event.target.value;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Redirect to Result component with quiz results
    const score = getScore();
    navigate('/result', { state: score });
  };

  const handleRetry = () => {
    setQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setIsSubmitted(false);
    fetchQuestions();
    navigate('/');
  };

  const currentQuestion = questions[questionIndex];

  const getScore = () => {
    let correctCount = 0;
    let attemptedCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] !== null) {
        attemptedCount += 1;
        if (userAnswers[index] === question.correct_answer) {
          correctCount += 1;
        }
      }
    });
    return { attemptedCount, correctCount };
  };

  return (
    <div>
      {currentQuestion ? (
        <div className='QuestionBox'>
          <b>
            {questionIndex + 1}) {currentQuestion.question}
          </b>
          <div className='Option'>
            {[ 
              { text: currentQuestion.correct_answer, value: currentQuestion.correct_answer },
              ...currentQuestion.incorrect_answers.map(answer => ({ text: answer, value: answer }))
            ].map((option, index) => (
              <div key={index} className='RedioButton'>
                <input
                  type='radio'
                  id={`option-${index}`}
                  name='answer'
                  value={option.value}
                  checked={userAnswers[questionIndex] === option.value}
                  onChange={handleAnswerChange}
                  disabled={isSubmitted}
                />
                <label htmlFor={`option-${index}`}>{option.text}</label>
              </div>
            ))}
          </div>
          <div className='BtnGroup'>
        {!isSubmitted && (
          <>
            <button 
              onClick={handlePrevious} 
              disabled={questionIndex === 0 || isSubmitted}
            >
              Previous
            </button>
            <button 
              onClick={handleNext} 
              disabled={questionIndex >= questions.length - 1 || isSubmitted}
            >
              Next
            </button>
            {questionIndex === questions.length - 1 && (
              <button onClick={handleSubmit}>
                Submit
              </button>
            )}
          </>
        )}
        {isSubmitted && (
          <button onClick={handleRetry}>Retry Quiz</button>
        )}
      </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

     
    </div>
  );
}

export default Quiz;
