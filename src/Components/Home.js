import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1>Quick Quiz</h1>
        <Link
          to="/game"
          className="text-3xl p-4 w-80 text-center border-2 border-blue-400 mb-4 bg-white text-blue-400
          hover:shadow-lg "
        >
          Play
        </Link>
        <a
          href="/"
          className="text-3xl p-4 w-80 text-center border-2 border-blue-400 mb-4 bg-white text-blue-400
          hover:shadow-lg "
        >
          High Score
        </a>
      </div>
    </div>
  );
};
