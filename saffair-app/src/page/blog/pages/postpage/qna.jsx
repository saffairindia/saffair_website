import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./qna.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Qna = ({ quiz , postId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [selectedOption, setSelectedOption] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showSubmit, setShowSubmit] = useState(true);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedRating, setSelectedRating] = useState(null);
    const { title} = useParams();

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setShowPopup(false);
    };

    const handleSubmit = async () => {
        if (selectedRating !== null && selectedOption !== "") {
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/rate`, { postId: postId, userId: currentUser._id, rating: selectedRating });
                alert('Rating submitted successfully!');
                setShowPopup(true);
                if (selectedOption === quiz[0].correctAnswer) {
                    setCorrectAnswer("");
                } else {
                    setCorrectAnswer(quiz[0].correctAnswer);
                }
                setShowSubmit(false);
            } catch (error) {
                alert('Error submitting rating: ' + error.message);
            }
        } else {
            if (selectedRating === null) {
                alert('Please select a rating before submitting.');
            } else {
                alert('Please answer the quiz before submitting.');
            }
        }
    };

    useEffect(() => {
        const ratingItems = document.querySelectorAll('.feedback li');
        ratingItems.forEach(item => {
            item.addEventListener('click', () => {
                ratingItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
        return () => {
            ratingItems.forEach(item => {
                item.removeEventListener('click', () => {});
            });
        };
    }, []);

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
                                            disabled={!showSubmit}
                                        />
                                        <label
                                            htmlFor={`option${idx + 1}`}
                                            className={`text-xl ml-3 ${selectedOption === option ? "text-blue-500" : ""}`}
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
                            <ul className="feedback">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <li
                                        key={rating}
                                        className={`${svgClasses[rating - 1]} ${selectedRating === rating ? 'active' : ''}`}
                                        onClick={() => handleRatingClick(rating)}
                                    >
                                        <div>
                                            {svgClasses[rating - 1] !== 'ok' && (
                                                <>
                                                    <svg className="eye left">
                                                        <use xlinkHref="#eye"></use>
                                                    </svg>
                                                    <svg className="eye right">
                                                        <use xlinkHref="#eye"></use>
                                                    </svg>
                                                    <svg className="mouth">
                                                        <use xlinkHref="#mouth"></use>
                                                    </svg>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
                                    <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
                                </symbol>
                                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" id="mouth">
                                    <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
                                </symbol>
                            </svg>
                            <a className="dribbble" href="https://dribbble.com/ai" target="_blank" rel="noreferrer">
                                <img
                                    src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
                                    alt=""
                                />
                            </a>
                            <p className="mt-2">(Do give the rating in order to submit the quiz)</p>
                        </div>
                    </div>
                    {currentUser ? (
                        showSubmit && (
                            <div className="submitbutton flex justify-center">
                                <button className="submit" onClick={handleSubmit}>
                                    Submit
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

const svgClasses = [
  'angry',
  'sad',
  'ok',
  'good',
  'happy'
];

export default Qna;
