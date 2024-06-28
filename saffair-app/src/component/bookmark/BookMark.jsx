import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const BookMark = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isBookmarked, setIsBookmarked] = useState(
    currentUser &&
      currentUser.bookmarks &&
      currentUser.bookmarks.includes(currentUser._id)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentUser &&
      post &&
      post.bookmarks &&
      post.bookmarks.includes(currentUser._id)
    ) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [currentUser, post]);

  const handleBookmark = async () => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/bookmark/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser._id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to bookmark post");
      }
      setIsBookmarked(true);

      // Handle success (e.g., update UI)
    } catch (error) {
      console.error("Error bookmarking post:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleUnbookmark = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/unbookmark/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser._id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unbookmark post");
      }
      setIsBookmarked(false);
      // Handle success (e.g., update UI)
    } catch (error) {
      console.error("Error unbookmarking post:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="bookmark">
      {currentUser &&
        (isBookmarked ? (
          <>
            <button onClick={handleUnbookmark} >
            <FaBookmark style={{color:'black'}} />
            </button>
          </>
        ) : (
          <button onClick={handleBookmark}>
         <FaRegBookmark  style={{color:'black'}}/>
          </button>
        ))}
    </div>
  );
};

export default BookMark;
