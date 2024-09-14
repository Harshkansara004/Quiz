import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { attemptedCount, correctCount } = location.state || {};

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className='QuestionBox'>
      <h3>Quiz Summary</h3>
      <p>Total Questions Served: {attemptedCount}</p>
      <p>Total Correct Questions: {correctCount}</p>
      <p>Total Incorrect Questions: {attemptedCount - correctCount}</p>
      <div className='BtnGroup'><button onClick={handleRetry}>Retry Quiz</button></div>
    </div>
  );
}

export default Result;
