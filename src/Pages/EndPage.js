import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export const EndPage = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <button
        onClick={handleHomeClick}
        className="text-2xl mt-4 p-2 w-64 text-center border-2 border-blue-400 mb-4 bg-white text-blue-400
          hover:shadow-lg transition duration-150 ease-in-out"
      >
        Home Ppage
      </button>
      <button
        onClick={handleHomeClick}
        className="text-2xl mt-4 p-2 w-64 text-center border-2 border-blue-400 mb-4 bg-white text-blue-400
          hover:shadow-lg transition duration-150 ease-in-out"
      >
        Play Again
      </button>
    </Fragment>
  );
};
