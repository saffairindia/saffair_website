import "./../blog/post.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";

export default function UpdatesCon({
  _id,
  title,
  createdAt,
  image,
  content,
  category,
}) {
  const { currentUser } = useSelector((state) => state.user);



  return (
    <>
      <div className="postContainer">
        <div className="card">
          <Link to={`/post/${_id}`}>
            <div className="card__header">
              <img
                src={image}
                alt="card__image"
                className="card__image"
                width="600"
              />
            </div>
          </Link>
          <div className="card__body">
            <span className="tag">
              {" "}
              {/* <PiTagChevronFill
                  color="blue"
                  style={{ marginRight: "5px", fontSize: "15px" }}
                />{" "} */}
              {category}
            </span>
            <Link to={`/post/${_id}`} className="link">
              <div className="postTitle">
                <h5>{title}</h5>
              </div>
              {/* <p>
                Render truncated HTML content
                <span
                  dangerouslySetInnerHTML={{
                    __html: truncateText(content, 60),
                  }}
                />
              </p> */}
            </Link>
          </div>
          <div className="card__footer">
            {/* Conditionally render user information if currentUser exists */}
            {currentUser && (
              <div className="user">
                <img
                  src={currentUser.profilePicture}
                  alt="user__image"
                  className="user__image"
                />
                <div className="user__info">
                  <h6>{currentUser.username}</h6>
                  <small>
                    <time>{format(new Date(createdAt), "MMMM dd, yyyy")}</time>
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
