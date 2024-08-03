import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./post.css";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Post({
  _id,
  title,
  createdAt,
  image1,
  bookmark,
  content,
  category,
  readingType,
  contributionType,
  updatedAt,
  slug,
  ratings
}) {


  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / ratings.length;
  };

  const averageRating = calculateAverageRating(ratings);

  const encodedTitle = encodeURIComponent(title).replace(/%20/g, '_');


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Utility function to truncate content
  const truncateContent = (content, length) => {
    const strippedContent = stripHtmlTags(content);
    return strippedContent.length > length ? strippedContent.substring(0, length) + "..." : strippedContent;
  };

  const previewContent = truncateContent(content, 25);
  const prevtitle = truncateContent(title, 45);
  const formattedRating = Number.isInteger(averageRating)
  ? averageRating.toFixed(0)  // No decimal places if it's an integer
  : averageRating.toFixed(1); // Two decimal places if it's not an integer

  return (
    <>

      <div className=" postContainer w-[325px] p-1 m-1  flex flex-col justify-evenly " onClick={scrollToTop}>
        <div className="card ">
          <Link to={`/post/${encodedTitle}`}>
            <div className="card__header  w-full flex flex-row justify-center">
              <img
                src={image1}
                alt="card__image"
                className="card__image self-center"
                width="600"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>
          <div className="card__body flex flex-col justify-evenly self-start px-4">
            <div className="flex flex-row w-full justify-between items-center pr-6 ">
              <span className="tag text-blue-900 text-[14px]">{readingType}</span>
              {!averageRating ? (<></>): (
                <>
                <span className="self-end">
                <span >{formattedRating}/5 </span>
                <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} />
              </span>
                </>
              )}
            </div>
            <Link to={`/post/${encodedTitle}`} className="link">
              <div className="px-[4px] w-full flex flex-row justify-start">
                <h5 className="text-[20px]  font-extrabold">{prevtitle}</h5>
              </div>
              <div>
                <p className="mb-1 text-[16px] font-light  mt-1 px-[4px]">{previewContent}</p>

              </div>
            </Link>
            <div className="flex flex-row gap-3">
              <div className="flex flex-wrap gap-2">
                {category.map((tag, index) => (
                  <div key={index} className="flex items-center">
                    <p className="tag text-blue-600 text-[14px]"> {tag}</p>
                    {/* <span className="text-gray-400 text-[12px]">&bull;</span>
                    <span className="text-blue-600 text-[12px]">{tag}</span> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
