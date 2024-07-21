import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'; // Import the link icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ReviewPost() {

  const [formData, setFormData] = useState({
    category: []
  });
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const [coinHistory, setCoinHestory] = useState({});

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/api/getposts?postId=${postId}`
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, isReviewed: true };
      const updatePostRes = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/reviewcontributorpost/${postId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );
      const data = await updatePostRes.json();
      if (!updatePostRes.ok) {
        setPublishError(data.message);
        return;
      }

      if (updatePostRes.ok) {
        setPublishError(null);
        navigate("/dashboard?tab=postrequest");
      }

      const updatedCoinHestory = {
        ...coinHistory,
        eventName: "post approved coin",
      };
      const coinRes = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/add-event/${formData.userId}`,
        {
          method: "put",
          credentials: "include",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(updatedCoinHestory),
        }
      );
      if (!coinRes.ok) {
        alert("something went wrong");
      }
      if (coinRes.ok) {
        alert("successfully added coins");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Review post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <div className="flex items-center flex-col gap-4 sm:flex-row justify-between">

          <p className="">Title: </p>
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
            readOnly
          />

        </div>
        <div className="flex items-center  flex-col gap-4 sm:flex-row justify-between">

          <p className="">Contribution type: </p>
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"

            value={formData.contributionType}
            readOnly
          />

        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p>Categories : </p>
          {formData.category.map((cat, index) => (
            <div key={index} className="flex items-center m-1 p-2 bg-blue-100 text-blue-600 rounded-full shadow-sm">
              <span className="font-medium">{cat}</span>
            </div>
          ))}
        </div>

        {formData.image1 && (
          <div className="my-3 gap-3">
            <p>Document 1:</p>
            <a href={formData.image1} target="_blank" rel="noopener noreferrer">
              <img
                src={formData.image1}
                alt={formData.image1}
                className="mt-2 w-full h-72 object-cover"
              />
            </a>
          </div>
        )}

        {formData.image2 && (
          <div className="my-3 gap-3">
            <p>Document 2:</p>
            <a href={formData.image1} target="_blank" rel="noopener noreferrer">
              <img
                src={formData.image2}
                alt={formData.image2}
                className="mt-2 w-full h-72 object-cover"
              /></a>
          </div>
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        {formData.link1 &&
          <div className="my-2 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <input
              type="text"
              value={formData.link1}
              placeholder="Enter link"
              className="flex-1 border border-gray-300 rounded-md py-1 px-3"
              readOnly
            />
            <a href={formData.link1} >
            <FontAwesomeIcon icon={faExternalLinkSquareAlt} />

            </a>


          </div>
        }
        {formData.link2 &&
          <div className="my-2 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <input
              type="text"
              value={formData.link2}
              placeholder="Enter link"
              className="flex-1 border border-gray-300 rounded-md py-1 px-3"
              readOnly
            />
           <a href={formData.link2} >
            <FontAwesomeIcon icon={faExternalLinkSquareAlt} />

            </a>

          </div>
        }
        <TextInput
          type="number"
          max={100}
          placeholder="Give Coins"
          required
          onChange={(event) => {
            setCoinHestory({ ...coinHistory, coinsEarned: event.target.value });
            setFormData({ ...formData, coinalloted: event.target.value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Reviewed
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
