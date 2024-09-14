import React from 'react';
import Quiz from './Quiz';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
