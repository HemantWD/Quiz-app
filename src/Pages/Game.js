import React, { useEffect, useState } from "react";
import { EndPage } from "./EndPage";

export const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        const loadedQuestion = data.results;
        const formattedQuestions = loadedQuestion.map((question) => {
          const formattedQuestion = {
            question: question.question,
            correctAnswer: question.correct_answer,
            choices: [...question.incorrect_answers],
          };
          formattedQuestion.choices.splice(
            Math.floor(Math.random() * 4) + 1,
            0,
            formattedQuestion.correctAnswer
          );
          return formattedQuestion;
        });
        setQuestionsArray(formattedQuestions);
      })
      .catch((error) => {
        console.log("Error Fetching the API: ", error);
      });
  }, []);

  const currentQuestion = questionsArray[currentQuestionIndex];

  const handleAnswerSelection = (selectedChoiceIndex, correctChoiceIndex) => {
    setSelectedAnswer(selectedChoiceIndex);
    if (selectedChoiceIndex === correctChoiceIndex) {
      setScore(score + 1);
    }
  };
  const handleNextClick = () => {
    setSelectedAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handlePreviousClick = () => {
    if (currentQuestionIndex >= 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (currentQuestionIndex >= questionsArray.length) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center p-8">
        <div className="bg-slate-300 p-8 rounded-lg shadow-md text-center">
          <h1 className="font-semibold ">Quiz Completed</h1>
          <p className="text-3xl text-green-600">
            Your Score: {score}/{questionsArray.length}
          </p>
        </div>
        <EndPage />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center p-8">
      <div id="game" className="flex flex-col justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <div className="">
              <p className="text-center text-3xl font-bold">Question</p>
              <h1>
                {currentQuestionIndex + 1}/{questionsArray.length}
              </h1>
            </div>
          </div>
        </div>
        <h2 id="question">{currentQuestion.question}</h2>
        {currentQuestion.choices.map((choice, index) => {
          const choiceNumber = index + 1;
          const isSelected = selectedAnswer === `choices${choiceNumber}`;
          const isCorrect =
            index ===
            currentQuestion.choices.indexOf(currentQuestion.correctAnswer);
          return (
            <div
              key={index}
              className={` flex w-full mb-2 cursor-pointer border-2 ${
                isSelected
                  ? isCorrect
                    ? "border-green-400 bg-green-400"
                    : "border-red-400 bg-red-400"
                  : "border-slate-400 bg-white"
              } text-2xl hover:shadow-md transform hover:-translate-y-1 hover:transition-transform duration-150`}
              onClick={() =>
                handleAnswerSelection(`choices${choiceNumber}`, index)
              }
            >
              <p className="py-6 px-11 bg-blue-400 text-white">
                {`Option ${choiceNumber}`}
              </p>
              <p className="p-6">{choice}</p>
            </div>
          );
        })}
        <div className="flex justify-between p-4">
          <button
            onClick={handlePreviousClick}
            className="text-xl w-72 flex justify-center mt-4 py-2 px-2 bg-blue-400 text-white rounded"
          >
            Previous Question
          </button>
          <button
            onClick={handleNextClick}
            className="text-xl w-72 flex justify-center mt-4 bg-blue-400 text-white py-2 px-2 rounded"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};
