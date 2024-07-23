import React, { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import { format } from "date-fns";
import "./postpage.css";
import Share1 from "../../../../component/share1/Share1";
import Post from "../../Post";
import Share2 from "../../../../component/share2/Share2";
import AdminInfo from "../../../../component/adminInfo/AdminInfo";
import TableOfContent from "../../../../component/tableofcontent/TableOfContent";
import Weatherbox from "../../../../component/weatherbox/Weatherbox";
import { Spinner } from "flowbite-react";
import CommentSection from "../../../../component/commentsection/CommentSection";
import BookMark from "../../../../component/bookmark/BookMark";
import Qna from "./qna";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import { faLink } from '@fortawesome/free-solid-svg-icons';
export default function PostPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [postInfo, setPostInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasRated, setHasRated] = useState(false);
  const { title } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/api/post`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the post data by title
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, '_');

    fetch(`${process.env.REACT_APP_BACKEND_API}/api/post/${encodedTitle}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        return response.json();
      })
      .then(postInfo => {
        setPostInfo(postInfo);
        setLoading(false);

        if (currentUser) {
          const userHasRated = postInfo.ratings.some(rating => rating.userId === currentUser._id);
          setHasRated(userHasRated);
        }
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [title, currentUser]);


  if (!postInfo) return null;

  document.querySelectorAll(".feedback li").forEach((entry) =>
    entry.addEventListener("click", (e) => {
      if (!entry.classList.contains("active")) {
        document
          .querySelector(".feedback li.active")
          .classList.remove("active");
        entry.classList.add("active");
      }
      e.preventDefault();
    })
  );

  return (
    <>
      <div style={{ Height: "800px" }}>
        {loading ? (
          <div className="spinnerr" style={{ height: "90vh" }}>
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="postMainPage">
            <div className="postMainTopPage">
              <div className="blogContainer">
                <div className="coverCon relative">

                  <img
                    src={postInfo.image1}
                    className="postImg"
                    alt="post img"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="blurTitle glass">
                    <div className="tagsection">
                      <time className="duration font-extrabold ">
                        On {format(new Date(postInfo.createdAt), "MMMM dd, yyyy")}
                      </time>
                      <h1 className="posttitle font-extrabold">{postInfo.title}</h1>
                    </div>
                  </div>
                  <div>
                  </div>

                </div>
                <div className="my-3 flex flex-row justify-between items-center">
                  <div className="flex flex-wrap items-center gap-2">
                    <p>Categories : </p>
                    {postInfo.category.map((cat, index) => (
                      <div key={index} className="flex items-center m-1 p-2 bg-blue-100 text-[#2a758a] rounded-full shadow-sm">
                        <span className="font-medium">{cat}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      top: "2px",
                      right: "8px",
                      zIndex: "10",
                      fontSize: "35px",
                    }}
                    className="self-align"
                  >
                    <BookMark post={postInfo} />
                  </div>
                </div>
                <div className="otherhalf my-2  flex flex-col">
                  <div className="mt-2 w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">


                  </div>

                  <div className="postDataCon mt-2">

                    <div
                      className="post-content"
                      dangerouslySetInnerHTML={{ __html: postInfo.content }}
                    />
                  </div>
                  {/* {postInfo.image2 && (
                    
                      <a href={postInfo.image2} target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 h-72">
                        <img
                          src={postInfo.image2}
                          alt="pic2"

                          className="w-full h-72 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                        />
                      </a>
                    )} */}
                  <div className="flex flex-warp mb-4 gap-4 items-start">
                    {postInfo.link1 && (
                      <a target="_blank" rel="noopener noreferrer" href={postInfo.link1} className="bg-blue-100 text-white font-bold py-2 px-4 rounded-full w-[100px] max-w-xs flex flex-row justify-center">
                        <FontAwesomeIcon icon={faLink} className="w-6 h-6 text-blue-500" />
                      </a>
                    )}
                    {postInfo.link2 && (
                      <a target="_blank" rel="noopener noreferrer" href={postInfo.link2} className="bg-blue-100 text-white font-bold py-2 px-4 rounded-full w-[100px] max-w-xs flex flex-row justify-center">
                        <FontAwesomeIcon icon={faLink} className="w-6 h-6 text-blue-500" />
                      </a>
                    )}

                  </div>
                  {currentUser ? (
                    <>
                      {hasRated ? (
                        <p className="m-2  text-red-700 font-bold text-xl">Thank you for participating in the quiz</p>
                      ) : (
                        <div>
                          {postInfo.quiz && postInfo.quiz.length > 0 ? (
                            <Qna quiz={postInfo.quiz} postId ={postInfo._id} quizprize={postInfo.quizprize} />
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      {postInfo.quiz && postInfo.quiz.length > 0 ? (
                        <Qna quiz={postInfo.quiz} postId ={postInfo._id} quizprize={postInfo.quizprize}/>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}



                  <div className="authInfo">
                    <AdminInfo userId={postInfo.userId} />
                    <Share2 />
                  </div>
                  <div>
                    <CommentSection postId={postInfo._id} />
                  </div>
                </div>

              </div>
              <div className="rightSide mt-6">
                <div style={{ marginTop: "10px" }}>
                  <Weatherbox />
                </div>
                <div className="share1">
                  <Share1 />
                </div>
                <div className="tocCon">
                  <TableOfContent postContent={postInfo.content} />
                </div>
                {posts.slice(0, 3).map((post) => (
                  <Post key={post._id} {...post} color="black" />
                ))}
              </div>


            </div>

            <div className="bottomPost">
              <div
                className="readingtitle"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <h2 className="text-2xl font-bold">Readings</h2>
                <hr
                  style={{
                    width: "70%",
                    height: "2px",
                    margin: "10px",
                    backgroundColor: "#2196BA",
                    border: "none",
                  }}
                />
              </div>
              <div class="cards-wrapper" id="style-5">
                <div className="homeReadings">
                  {posts.map((post) => (
                    <Post key={post._id} {...post} color="black" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
