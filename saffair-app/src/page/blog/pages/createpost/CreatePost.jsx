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
import {  useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FaChevronDown } from 'react-icons/fa';

export default function CreatePost() {

  ////////Quiz functions
  const [quizVisible, setQuizVisible] = useState(false);

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
  const [isQuizSaved, setIsQuizSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleAddQuiz = () => {
    if (
      !quizData.question ||
      quizData.options.some(option => option.trim() === '') ||
      quizData.correctAnswerIndex === null
    ) {
      setErrorMessage('Please fill out all fields and select the correct answer.');
      return;
    }
    setErrorMessage('');
    setIsQuizSaved(true);
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
  
  
  /////////Form publiched API
  const [publishError, setPublishError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData); // This will log the updated formData after setFormData runs
    
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
  
      // If response is OK
      setPublishError(null);
      navigate(`/blog`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  


  /////////Documents upload functions

  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    category: [],
  });

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
            else if (x === 3) {
              setFormData({ ...formData, image3: downloadURL });
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
            else if (x === 3) {
              setFormData({ ...formData, image3: downloadURL });
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

  const [isDivVisible2, setDivVisible2] = useState(false);

  const showDiv2 = () => {
    setDivVisible2(true);
  };
  const hideDiv2 = () => {
    setDivVisible2(false);
  };

  const [events, setEvents] = useState([]);

  const fetchEventsFromBackend = async () => {
    try {
      // Fetch events data from backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/events/eventTitles`);
      const data = await response.json();

      // Assuming events data is an array of objects with a 'title' property
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventChange = (event) => {
    setFormData({ ...formData, eventtitle: event.target.value });

  };

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
    if (formData.category.length < 3 && !formData.category.includes(category)) {
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
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setFormData({ ...formData, contributionType: selectedValue });

    // Check if the selected value is "join our campaigns" and trigger your function
    if (selectedValue === 'join our campaigns') {
      fetchEventsFromBackend(); // Replace handleJoinCampaigns with your actual function
    }
  };

 
  return (
    <div className="mb-6 p-3 max-w-3xl mx-auto mt-8 min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
      Let's Contribute 
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {currentUser.isAdmin && (
          <>
            <label htmlFor="Select reading type" className="block text-sm font-medium text-gray-700">
              Select reading type
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
        {
          (currentUser.isAdmin) ?(<></>) :(
            <>
            <label htmlFor="Select Contribution type" className="block text-sm font-medium text-gray-700">
          Select Contribution type
        </label>
        <Select

          onChange={handleSelectChange}

          required
        >
          <option value="News / Update">News / Update</option>
          <option value="Legal Updates">Legal Updates</option>
          <option value="innovation">innovation</option>
          <option value="get your voice bigger with community">get your voice bigger with community</option>
          <option value="suggest a reforms">suggest a reforms</option>
          <option value="join our campaigns">join our campaigns</option>
          <option value="Donate / Sponser">Donate / Sponser</option>
          <option value="Get outdoor Air Analyzer">Get outdoor Air Analyzer</option>
          <option value="Need Community Support / Suggestions / Survey<">Need Community Support / Suggestions / Survey</option>
        </Select>
            </>
          )
        }
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            {formData.otherCategory ? formData.otherCategory : "Category"}
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
                  <span>{formData.otherCategory ? formData.otherCategory : "Show category (max 3)"}</span>
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
        {formData.contributionType === "join our campaigns" ? (
          <div className="conditional-div gap-4">
            {/* Conditional div content for campaign */}
            <div>
              <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                Events:
              </label>
              <select
                id="Title"
                name="Title"
                value={formData.eventtitle}
                onChange={handleEventChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an event</option>
                {events.map((event) => (
                  <option value={event.eventTitle}>
                    {event.eventTitle}
                  </option>
                ))}
              </select>
            </div>
           
            <div className="flex  mt-4 flex-col gap-4 justify-between">
              <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <TextInput
                type="text"
                placeholder="Title"
                required
                id="title"
                className="flex-1 my-2 "
                value={formData.title}
                onChange={(e)=>{
                  setFormData({ ...formData, title: e.target.value });

                }}
              />

              < div className=" gap-2">
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                  <FileInput
                    type="file"
                    accept="image/*"
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
                      "Upload image"
                    )}
                  </Button>
                </div>
                {(documentUploadError || imageUploadError) && <Alert color="failure">{(documentUploadError || imageUploadError)}</Alert>}
                {/* {(formData.pdf || formData.image) && (
              <img
                src={formData.pdf || formData.image}
                alt="upload"
                className="w-full h-72 object-cover"
              />
            )} */}
                {
                  (formData.image1) ? <img
                    src={formData.image1}
                    alt={formData.image1}
                    className="w-full h-72 object-cover"
                  /> : <>
                    {/* {documentDownloadURL && (
                <PDFPreview pdfPath={documentDownloadURL} />
              )} */}

                  </>

                }


                {!isDivVisible2 && (
                  <Button onClick={showDiv2} gradientDuoTone="cyanToBlue" className=" text-white my-2 py-2 px-4 rounded">Add more</Button>
                )}
                {isDivVisible2 && (
                  <div>
                    <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                      <FileInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <Button
                        type="button"
                        gradientDuoTone="cyanToBlue"
                        size="sm"
                        outline
                        onClick={() => handleImageORDocument(2)}
                        disabled={imageUploadProgress}
                      >
                        {imageUploadProgress ? (
                          <div className="w-16 h-16">
                            <CircularProgressbar
                              value={imageUploadProgress}
                              text={`${imageUploadProgress || 0}%`}
                            />
                          </div>
                        ) : (
                          "Upload Image 2"
                        )}
                      </Button>
                      <Button onClick={hideDiv2}>Remove</Button>

                    </div>
                    {imageUploadError && (
                      <Alert color="failure">{imageUploadError}</Alert>
                    )}
                    {formData.image2 && (
                      <img
                        src={formData.image2}
                        alt="upload"
                        className="w-full h-72 object-cover"
                      />
                    )}
                  </div>
                )}





              </div>
            </div>

          </div>
        ) : (
          <div className="conditional-div">
            {/* Conditional div content for other selections */}
            <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
              <TextInput
                type="text"
                placeholder="Title"
                required
                id="title"
                className="flex-1 my-2"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />


            </div>
            < div className="my-2 gap-10">
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
              {(documentUploadError || imageUploadError) && <Alert color="failure">{(documentUploadError || imageUploadError)}</Alert>}

              {
                (formData.image1) ? <img
                  src={formData.image1}
                  alt={formData.image1}
                  className="w-full h-72 object-cover"
                /> : <>
                  {/* {documentDownloadURL && (
                <PDFPreview pdfPath={documentDownloadURL} />
              )} */}

                </>

              }







              {!isDivVisible2 && (
                <Button onClick={showDiv2} gradientDuoTone="cyanToBlue" className=" text-white my-2 py-2 px-4 rounded">add more</Button>
              )}
              {isDivVisible2 && (
                <div>
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
                  {(documentUploadError || imageUploadError) && <Alert color="failure">{(documentUploadError || imageUploadError)}</Alert>}
                  {/* {(formData.pdf || formData.image) && (
              <img
                src={formData.pdf || formData.image}
                alt="upload"
                className="w-full h-72 object-cover"
              />
            )} */}
                  {
                    (formData.image2) ? <img
                      src={formData.image2}
                      alt={formData.image2}
                      className="w-full h-72 object-cover"
                    /> : <>
                      {/* {documentDownloadURL && (
                <PDFPreview pdfPath={documentDownloadURL} />
              )} */}

                    </>

                  }

                </div>
              )}





              {imageUploadError && (
                <Alert color="failure">{imageUploadError}</Alert>
              )}
              {formData.image3 && (
                <img
                  src={formData.image3}
                  alt="upload"
                  className="w-full h-72 object-cover"
                />
              )}


            </div>


          </div>
        )}

        <ReactQuill
          theme="snow"
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
               <Button onClick={() => setQuizVisible(!quizVisible)}>
                 Toggle Quiz
               </Button>
               {quizVisible && (
                 <div>
                   <label htmlFor="Qna" className="block text-sm font-medium text-gray-700">
                     QNA (select the right answer below the option)
                   </label>
                   <TextInput
                     required
                     type="text"
                     placeholder="Quiz heading"
                     value={quizData.question}
                     onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
                     className="mb-4 mt-2"
                   />
                   {quizData.options.map((option, index) => (
                     <div key={index} className="gap-5">
                       <TextInput
                         required
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
                   {errorMessage && (
                     <div className="text-red-500 mt-2">{errorMessage}</div>
                   )}
                   <Button onClick={handleAddQuiz} className="my-4">
                     Save Quiz
                   </Button>
                   {isQuizSaved && (
                     <p>Quiz saved</p>
                   )}
                 </div>
               )}
             </div>
            )}
          </div>
        ) : (
          <></>
        )}


        {currentUser.isAdmin ? (
          <Button type="submit" gradientDuoTone="cyanToBlue">
            Publish
          </Button>
        ) : (
          <Button type="submit" gradientDuoTone="cyanToBlue">
            Upload
          </Button>
        )}
        {publishError && (
          <>
            {console.log(publishError)}
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          </>
        )}

      </form>
    </div>
  );
}