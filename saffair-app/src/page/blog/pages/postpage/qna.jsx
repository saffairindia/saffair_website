import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./qna.css";
const Qna = ({ quiz }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [selectedOption, setSelectedOption] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showSubmit, setShowSubmit] = useState(true);
    const [correctAnswer, setCorrectAnswer] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setShowPopup(false); // Hide popup when option changes
    };

    const handleSubmit = () => {
        setShowPopup(true);
        if (selectedOption === quiz[0].correctAnswer) {
            setCorrectAnswer("");
        } else {
            setCorrectAnswer(quiz[0].correctAnswer);
        }
        setShowSubmit(false); // Hide submit button after submission
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            {quiz.slice(0, 1).map((q, index) => (
                <div key={index} className="main">
                    <div
                        className="mt-2 items-center"
                        style={{ backgroundColor: "#2196BA", height: "60px" }}
                    >
                        <div
                            className="flex justify-center mx-auto"
                            style={{ color: "white", fontWeight: "bold", fontFamily: "Raleway" }}
                        >
                            <div className="mt-4">Check Knowledge & earn</div>
                        </div>
                    </div>
                    <div className="theqna mt-5 w-full flex flex-col" style={{ fontFamily: "Raleway" }}>
                        <div className="question">
                            <div htmlFor="question" className="text-xl flex">
                                <div className="font-bold">Q.1</div>
                                <div className="ml-3 font-bold">{q.quizQuestion}</div>
                            </div>
                            <div className="options pl-9 p-3">
                                {q.quizOptions.map((option, idx) => (
                                    <div key={idx} className="op">
                                        <input
                                            type="radio"
                                            id={`option${idx + 1}`}
                                            name="question"
                                            value={option}
                                            onChange={handleOptionChange}
                                            disabled={!showSubmit} // Disable options after submission
                                        />
                                        <label
                                            htmlFor={`option${idx + 1}`}
                                            className={`text-xl ml-3 ${selectedOption === option ? "text-blue-500" : ""
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
                   
                    <div>
                        <div className="ratings mt-5">
                            <p className="mb-5 text-md">Give Honest Rating </p>
                            <ul class="feedback">
                                <li class="angry">
                                    <div>
                                        <svg class="eye left">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg class="eye right">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg class="mouth">
                                            <use xlinkHref="#mouth"></use>
                                        </svg>
                                    </div>
                                </li>
                                <li class="sad">
                                    <div>
                                        <svg class="eye left">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg class="eye right">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg class="mouth">
                                            <use xlinkHref="#mouth"></use>
                                        </svg>
                                    </div>
                                </li>
                                <li class="ok">
                                    <div></div>
                                </li>
                                <li class="good active">
                                    <div>
                                        <svg class="eye left">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg class="eye right">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg class="mouth">
                                            <use xlinkHref="#mouth"></use>
                                        </svg>
                                    </div>
                                </li>
                                <li class="happy">
                                    <div>
                                        <svg class="eye left">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg class="eye right">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                    </div>
                                </li>
                            </ul>

                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                <symbol
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 7 4"
                                    id="eye"
                                >
                                    <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
                                </symbol>
                                <symbol
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 18 7"
                                    id="mouth"
                                >
                                    <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
                                </symbol>
                            </svg>

                            <a class="dribbble" href="https://dribbble.com/ai" target="_blank">
                                <img
                                    src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
                                    alt=""
                                ></img>
                            </a>
                            <p className="mt-2">(Do give the rating in order to submit the quiz)</p>
                            {/* <a class="twitter" target="_blank" href="https://twitter.com/aaroniker_me"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><path d="M67.812 16.141a26.246 26.246 0 0 1-7.519 2.06 13.134 13.134 0 0 0 5.756-7.244 26.127 26.127 0 0 1-8.313 3.176A13.075 13.075 0 0 0 48.182 10c-7.229 0-13.092 5.861-13.092 13.093 0 1.026.118 2.021.338 2.981-10.885-.548-20.528-5.757-26.987-13.679a13.048 13.048 0 0 0-1.771 6.581c0 4.542 2.312 8.551 5.824 10.898a13.048 13.048 0 0 1-5.93-1.638c-.002.055-.002.11-.002.162 0 6.345 4.513 11.638 10.504 12.84a13.177 13.177 0 0 1-3.449.457c-.846 0-1.667-.078-2.465-.231 1.667 5.2 6.499 8.986 12.23 9.09a26.276 26.276 0 0 1-16.26 5.606A26.21 26.21 0 0 1 4 55.976a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.251-19.949 37.251-37.249 0-.566-.014-1.134-.039-1.694a26.597 26.597 0 0 0 6.533-6.774z"></path></svg></a> */}
                            {/* <div className="submitbutton mt-4">
            <button className="submit">Submit</button>
          </div> */}
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
                </div>
            ))}
        </div>
    );
};

export default Qna;