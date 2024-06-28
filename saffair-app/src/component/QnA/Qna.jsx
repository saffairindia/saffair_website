import React, { useEffect, useState } from "react";
import Ratings from "../Ratings/Ratings";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Qna = ({ quiz}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const [ccorrectAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowPopup(false); // Hide popup when option changes
  };

  const handleSubmit = () => {
    if (selectedOption === quiz.correctAnswer) {
      setShowPopup(true);
    } else {
      setShowPopup(true);
      setCorrectAnswer(quiz.correctAnswer);
    }
    setShowSubmit(false); // Hide submit button after submission
  };
  
  return (
  
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {quiz.map((q, index) => (
          <div className="main">
          <div
            className="mt-2  items-center"
            style={{ backgroundColor: "#2196BA", height: "60px" }}
          >
            <div
              className="flex justify-center mx-auto"
              style={{ color: "white", fontWeight: "bold", fontFamily: "Raleway" }}
            >
              <div className="mt-4">Check Knowledge $ earn</div>
            </div>
          </div>
          <div
            className="theqna mt-5 w-full flex flex-col  "
            style={{ fontFamily: "Raleway" }}
          >
            <div className="question">
              <div htmlFor="question" className="text-xl flex">
                <div className="font-bold">Q.1</div>
                <div className="ml-3 font-bold">{q.quizQuestion}</div>
              </div>
              <div className="options pl-9 p-3">
                {q.quizOptions.map((option, index) => (
                  <div key={index} className="op">
                    <input
                      type="radio"
                      id={`option${index + 1}`}
                      name="question"
                      value={option}
                      onChange={handleOptionChange}
                      disabled={!showSubmit} // Disable options after submission
                    />
                    <label
                      htmlFor={`option${index + 1}`}
                      className={`text-xl ml-3 ${
                        selectedOption === option ? "text-blue-500" : ""
                      }`}
                    >
                      {option}
                    </label>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {currentUser ? (
            showSubmit && (
              <div className="submitbutton flex justify-center">
                <button className="submit" onClick={handleSubmit}>
                  Submit quiz
                </button>
              </div>
            )
          ) : (
            <div className="text-sm text-teal-500 my-5 flex gap-1">
              You must be signed in to submit the quiz.
              <Link className="text-blue-500 hover:underline" to={"/login"}>
                Sign In
              </Link>
            </div>
          )}
           {showPopup && (
            <div className="popup mt-5">
              {selectedOption === q.correctAnswer ? (
                <p className="bg-green-200 p-1 rounded-lg">
                  Nice job! You selected the correct answer.
                </p>
              ) : (
                <p className="bg-red-200 p-2 rounded-lg">
                  Oops! The correct answer is:{" "}
                  <span className="font-bold">{q.correctAnswer}</span>
                </p>
              )}
            </div>
          )}
          <Ratings />
       
         
        </div>
      ))}
    </div>
  );
};

export default Qna;
