import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaChevronDown } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons'; // Import the link icon


export default function EditContributorPost() {

  const [formData, setFormData] = useState({
    category: []
  });
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const [coinHistory, setCoinHestory] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  ////////Quiz functions
  const [quizVisible, setQuizVisible] = useState(false);
  const [coinsvisible, setCoinsVisible] = useState("");
  const [quizData, setQuizData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswerIndex: null,
  });
  

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...quizData.options];
    updatedOptions[index] = value;
    setQuizData({
      ...quizData,
      options: updatedOptions,
    });
  };

  const handleCorrectAnswerChange = (index) => {
    setQuizData({
      ...quizData,
      correctAnswerIndex: index,
    });
  };
  const handleAddQuiz = () => {
    const updatedFormData = {
      ...formData,
      quiz: [
        ...(formData.quiz || []),
        {
          quizQuestion: quizData.question,
          quizOptions: quizData.options,
          correctAnswer: quizData.options[quizData.correctAnswerIndex] || "",
        },
      ],
    };
    setFormData(updatedFormData);
    console.log(updatedFormData);
  };

  const coincheck = () => {
    
  }
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
          setCoinsVisible(data.posts[0].coinalloted);
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
      const updatedFormData = { ...formData, publish: true, isReviewed: true };
      const updatePostRes = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/updatecontributorpost/${postId}`,
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
        navigate(`/post/${postId}`);
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
        console.log("something went wrong");
      }
      if (coinRes.ok) {
        alert("successfully added coins");
      }
    } catch (error) {
      setPublishError(error);
    }
  };

  const [links, setLinks] = useState(['']); // Initialize with an empty link field
  const [uploadErrors, setUploadErrors] = useState([]);

  const handleAddLink = () => {
    if (links.length < 2) {
      setLinks([...links, '']);
    } else {
      setUploadErrors(['Maximum 2 links allowed']);
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const handleRemoveImage = (x) => {
    // Create a copy to avoid modifying original formData
    const newFormData = { ...formData };

    // Delete the image property with the dynamic key
    delete newFormData[`image${x}`];

    // Update the state with the modified formData (assuming setFormData is a state setter)
    setFormData(newFormData);
  }

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [documentUploadError, setDocumentUploadError] = useState(null);
  const [documentUploadProgress, setDocumentUploadProgress] = useState(null);
  // const [documentDownloadURL, setDocumentDownloadURL] = useState(null);
  const navigate = useNavigate();


  const handleImageORDocument = async (x) => {
    if (!file) {
      setImageUploadError("Please select a File");
    }
    else if (file.type === "image/jpeg" || file.type === "image/png") {
      await handleUpdloadImage(x);
    } else {
      await handleUploadDocument(x);
    }
  }
  const handleUpdloadImage = async (x) => {
    try {
      console.log("file = ", file)
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            if (x === 1) {
              setFormData({ ...formData, image1: downloadURL });
            }
            else if (x === 2) {
              setFormData({ ...formData, image2: downloadURL });
            }

          });
        }
      );
    } catch (error) {
      console.log("object");
      setImageUploadError("Image upload failed.....");
      setImageUploadProgress(null);
      console.log(error);
    }
  };


  const handleUploadDocument = (x) => {
    try {
      // console.log(file)
      console.log("file = ", file)

      if (!file) {
        setDocumentUploadError("Please select a document");
        return;
      }

      setDocumentUploadError(null);

      // Get reference to Firebase Storage
      const storage = getStorage();

      // Generate a unique file name
      const fileName = new Date().getTime() + "-" + file.name;

      // Create a reference to the storage location
      const storageRef = ref(storage, fileName);

      // Upload the file
      //  const metadata = {
      //           contentType: file.mimetype,
      //       };

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Track upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setDocumentUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setDocumentUploadError("Document upload failed");
          setDocumentUploadProgress(null);
        },
        () => {
          // Once upload is complete, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDocumentUploadProgress(null);
            setDocumentUploadError("Document upload successfully");
            // Set the download URL in the state
            if (x === 1) {
              setFormData({ ...formData, image1: downloadURL });
            }
            else if (x === 2) {
              setFormData({ ...formData, image2: downloadURL });
            }

          });
        }
      );
    } catch (error) {
      console.log("object")
      setDocumentUploadError("Document upload failed");
      setDocumentUploadProgress(null);
      console.error('=>>>> ', error);
    }
  };
  console.log(formData.userId);

  const [inputCategory, setInputCategory] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const categories = [
    'Uncategorized', 'Agriculture', 'Bollywood', 'Business', 'Crime',
    'Economy', 'Education', 'Entertainment', 'Environment', 'Events',
    'Fashion', 'Foreign', 'General', 'Health', 'Hollywood', 'International',
    'Legal', 'Lifestyle', 'National', 'Politics', 'Religious', 'Science',
    'Sports', 'Stock Market', 'Technology', 'Weather'
  ];

  const addCategory = (category) => {
    if (formData.category.length < 5 && !formData.category.includes(category)) {
      setFormData(prevFormData => ({ ...prevFormData, category: [...prevFormData.category, category] }));
    }
  };

  const removeCategory = (category) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      category: prevFormData.category.filter(cat => cat !== category)
    }));
  };

  const handleOtherCategoryChange = (e) => {
    setInputCategory(e.target.value);
  };

  const handleAddOtherCategory = () => {
    const lowerCaseInputCategory = inputCategory.toLowerCase();
    const otherVariations = ['other', 'othr', 'othar', 'othr'];

    if (!otherVariations.includes(lowerCaseInputCategory) && !formData.category.includes(inputCategory)) {
      addCategory(inputCategory);
      setInputCategory('');
    }
  };

  const handleCategoryClick = (category) => {
    if (formData.category.includes(category)) {
      removeCategory(category);
    } else {
      addCategory(category);
    }
  };

  const [other, setOther] = useState(false)
  const addother = () => {
    setOther(true)
  }


  return (
    <div className="my-8 p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {currentUser.isAdmin && (
          <>
            <label htmlFor="Select reading type" className="block text-sm font-medium text-gray-700">
              Select reading type:
            </label>
            <Select
              onChange={(e) =>
                setFormData({ ...formData, readingType: e.target.value })
              }
            >
              <option value="Blog">Blog</option>
              <option value="News">News</option>
              <option value="Update">Update</option>
            </Select>
          </>
        )}
        <label htmlFor="Select reading type" className="block text-sm font-medium text-gray-700">
          Contribution type:
        </label>
        <Select>
          <option >{formData.contributionType}</option>
        </Select>

        <div className="flex flex-col gap-4  justify-between">

          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
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
          />

          <label htmlFor="Select reading type" className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <div>
            <div className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm">
              <span className="text-sm text-center">{formData.otherCategory ? formData.otherCategory : "Selected category :"}</span>

              <div className="flex flex-wrap">

                {formData.category.map((cat, index) => (
                  <div key={index} className="flex items-center m-1 p-2 bg-blue-100 text-blue-600 rounded-full shadow-sm">
                    <span className="font-medium">{cat}</span>

                    <button
                      type="button"
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => handleCategoryClick(cat)}
                    >

                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

            </div>
            <div className="my-4 flex flex-col md:flex-row md:justify-between w-full">
              <div className="relative md:w-screen mt-4 md:mt-0">
                <button
                  type="button"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#1ec2f4] focus:border-[#1ec2f4] sm:text-base md:text-sm flex items-center justify-between"
                >
                  <span>{formData.otherCategory ? formData.otherCategory : "Show category (max 5)"}</span>
                  <FaChevronDown className="w-4 h-4" />
                </button>
                {dropdownVisible && (
                  <div className="absolute z-10 mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-lg">
                    <div className="flex flex-wrap">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center m-1 p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                          onClick={() => handleCategoryClick(category.toLowerCase())}
                        >
                          <span>{category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {!other && <Button gradientDuoTone="cyanToBlue" onClick={addother} className="mt-4  md:mt-0 md:ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Other
              </Button>}

            </div>



          </div>

          {other && (
            <div className="">
              <label htmlFor="otherCategory" className="block text-sm font-medium text-gray-700">
                {formData.otherCategory ? formData.otherCategory : "Other Category"}
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="otherCategory"
                  name="otherCategory"
                  value={inputCategory}
                  onChange={handleOtherCategoryChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <Button
                  type="button"
                  className="ml-2 "
                  onClick={handleAddOtherCategory}
                  gradientDuoTone="cyanToBlue"
                >
                  Add
                </Button>
              </div>
            </div>
          )}

        </div>





        {
          formData.image1 && (
            <div className="image-container">
              <a href={formData.image1} target="_blank" rel="noopener noreferrer">
                <img
                  src={formData.image1}
                  alt={formData.image1}
                  className="w-full h-72 object-cover"
                />
              </a>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRemoveImage(1)} // Pass image index
              >
                Remove Document
              </button>
            </div>
          )}

        {!formData.image1 && (
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="*/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="cyanToBlue"
              size="sm"
              outline
              onClick={() => handleImageORDocument(1)}
              disabled={imageUploadProgress || documentUploadProgress}
            >
              {(documentUploadProgress || imageUploadProgress) ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={documentUploadProgress || imageUploadProgress}
                    text={`${(documentUploadProgress || imageUploadProgress) || 0}%`}
                  />
                </div>
              ) : (
                "Upload document"
              )}
            </Button>
          </div>
        )}
        {(documentUploadError || imageUploadError) && <Alert color="failure">{(documentUploadError || imageUploadError)}</Alert>}





        {formData.image2 && (
          <div className="image-container">
            <a href={formData.image2} target="_blank" rel="noopener noreferrer">
              <img
                src={formData.image2}
                alt={formData.image2}
                className="w-full h-72 object-cover"
              /></a>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleRemoveImage(2)} // Pass image index
            >
              Remove Image
            </button>
          </div>
        )}

        {!formData.image2 && (
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="*/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="cyanToBlue"
              size="sm"
              outline
              onClick={() => handleImageORDocument(2)}
              disabled={imageUploadProgress || documentUploadProgress}
            >
              {(documentUploadProgress || imageUploadProgress) ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={documentUploadProgress || imageUploadProgress}
                    text={`${(documentUploadProgress || imageUploadProgress) || 0}%`}
                  />
                </div>
              ) : (
                "Upload document"
              )}
            </Button>
          </div>
        )}
        {(documentUploadError || imageUploadError) && <Alert color="failure">{(documentUploadError || imageUploadError)}</Alert>}


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
        {links.map((link, index) => (
          <div key={index} className="my-2 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <input
              type="text"
              value={index === 0 ? formData.link1 : formData.link2}
              onChange={(e) => {
                const updatedFormData = { ...formData };
                if (index === 0) {
                  updatedFormData.link1 = e.target.value;
                } else {
                  updatedFormData.link2 = e.target.value;
                }
                setFormData(updatedFormData);
              }}
              placeholder="Enter link"
              className="flex-1 border border-gray-300 rounded-md py-1 px-3"
            />
            
   
            <Button
              type="button"
              gradientDuoTone="redToOrange"
              size="sm"
              outline
              onClick={() => handleRemoveLink(index)}
            >
              Remove
            </Button>
          </div>
        ))}


        <div className="flex gap-4">
          <Button type="button" onClick={handleAddLink} gradientDuoTone="cyanToBlue">
            Add more Link
          </Button>

        </div>
        {uploadErrors.length > 0 && (
          <Alert color="failure">{uploadErrors.join('\n')}</Alert>
        )}

        {currentUser.isAdmin ? (
          <div>
            <Button gradientDuoTone="cyanToBlue" onClick={() => setQuizVisible(!quizVisible)} className="my-4">
              {quizVisible ? 'Hide Quiz Form' : 'Add Quiz'}
            </Button>

            {quizVisible && (
              <div>
                <label htmlFor="Qna" className="block text-sm font-medium text-gray-700">
                  QNA (select the right answer below the option)
                </label>
                <TextInput
                  type="text"
                  placeholder="Quiz heading"
                  value={quizData.question}
                  onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
                  className="mb-4 mt-2"
                />
                {quizData.options.map((option, index) => (
                  <div key={index} className="gap-5">
                    <TextInput
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="m-3"
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={quizData.correctAnswerIndex === index}
                      onChange={() => handleCorrectAnswerChange(index)}
                    />
                    <label className="m-3">Correct Answer</label>
                  </div>
                ))}
                <Button onClick={handleAddQuiz} className="my-4">Save Quiz</Button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}

        {!coinsvisible && <TextInput
          type="number"
          max={100}
          placeholder="Give Coins"
          required
          onChange={(event) => {
            setCoinHestory({ ...coinHistory, coinsEarned: event.target.value });
            setFormData({ ...formData, coinalloted: event.target.value });

          }}
        />}

        <Button type="submit" outline gradientDuoTone="cyanToBlue">
          Update post and publish
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
