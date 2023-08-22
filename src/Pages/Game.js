import React, { useState } from "react";

const questionsArray = [
  {
    questions: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    correctAnswer: 1,
  },
  {
    questions:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    correctAnswer: 3,
  },
  {
    questions: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    correctAnswer: 4,
  },
];

export const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const currentQuestion = questionsArray[currentQuestionIndex];

  const handleAnswerSelection = (selectedChoice, correctChoice) => {
    setSelectedAnswer(selectedChoice);
    if (selectedChoice === correctChoice) {
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
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <div className="bg-slate-300 p-8 rounded-lg shadow-md text-center">
          <h1 className="font-semibold ">Quiz Completed</h1>
          <p className="text-3xl text-green-600">
            Your Score:{score}/{questionsArray.length}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center p-8">
      <div id="game" className="flex flex-col justify-center">
        <h2 id="question">{currentQuestion.questions}</h2>
        {/* *! we are not copying the div here because we want that thing to be dynamc and the code looks simple */}
        {Object.keys(currentQuestion).map((key, index) => {
          if (key.includes("choice")) {
            const choiceNumber = parseInt(key.slice(-1));
            return (
              <div
                key={index}
                className={` flex w-full mb-2 cursor-pointer border-2 ${
                  selectedAnswer === key
                    ? choiceNumber === currentQuestion.correctAnswer
                      ? "border-green-400 bg-green-400"
                      : "border-red-400 bg-red-400"
                    : "border-slate-400 bg-white"
                } text-2xl hover:shadow-md transform hover:-translate-y-1 hover:transition-transform duration-150`}
                onClick={() =>
                  handleAnswerSelection(
                    key,
                    `choice${currentQuestion.correctAnswer}`
                  )
                }
              >
                <p className="py-6  px-11 bg-blue-400 text-white">
                  {`Option ${choiceNumber}`}
                </p>
                <p className="p-6">{currentQuestion[key]}</p>
              </div>
            );
          }
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
