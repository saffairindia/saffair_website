import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { Link } from "react-router-dom";
export default function EventPage() {
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  const [show, setShow] = useState(true)
  const [ans, setans] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/events/${id}`);
        if (res.ok) {
          const data = await res.json();
          setEventInfo(data);
        } else {
          console.log("Error!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchResponseCounts();

    fetchData();
  }, [id]);

  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');




  const handleButtonClick = async (option) => {
    try {
      setShow(false);
      setLoading(true);
      setMessage('');

      var response = option
      setans(option)
      await addInterest(response);
      setMessage('Interest added successfully!');
    } catch (error) {
      console.error('Failed to add interest:', error);
      setMessage('Failed to add interest. Please try again.');
    } finally {
      setLoading(false);
    }
    // Add your logic here to handle the selected option
  };

  const addInterest = async (response) => {
    try {
      const formData = {
        response: response,
        userId: currentUser._id,
        eventId: id,
      };
      console.log(formData)

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/events/addInterest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }

      );
      // console.log(first)

      if (res === 200) {
        throw new Error(`Failed to add interest to event: ${res.statusText}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error adding interest to event:', error);
      throw error;
    }
  };

  const [responseCounts, setResponseCounts] = useState({
    yes: 0,
    no: 0,
    maybe: 0
  });

  const fetchResponseCounts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/events/getCounts/${id}`);
      setResponseCounts(response.data);
    } catch (error) {
      console.error('Error fetching response counts:', error);
    }
  };

  function extractDate(dateStr) {
    // Use Date object to parse the date string
    const dateObj = new Date(dateStr);

    // Year, month, day (zero-indexed)
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(dateObj.getDate()).padStart(2, '0');

    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="mt-20">
      {eventInfo ? (
        <>

          <img
            src={eventInfo.eventImage}
            className="w-full h-64 md:h-screen object-cover"
            alt="eventImage"
          />
          <div className="flex flex-col items-start my-4 p-4 lg:p-8 mx-auto max-w-5xl bg-white rounded-lg shadow-md">
            <div className="text-4xl font-bold mb-2 text-teal-600">Event Title: {eventInfo.eventTitle}</div>
            <div className="text-lg text-gray-600">
              Start Date: {extractDate(eventInfo.startDate)} | End Date: {extractDate(eventInfo.endDate)}
            </div>
          </div>
          <div
            className="post-content mb-6  p-4 lg:p-6  mx-auto max-w-5xl bg-white rounded-lg shadow-md"
            dangerouslySetInnerHTML={{ __html: eventInfo.eventDescription }}

          >

          </div>

          {(eventInfo.link1 || eventInfo.link2) && (
            <div className="flex gap-4 items-start my-4 p-4 lg:p-8 mx-auto max-w-5xl bg-white rounded-lg shadow-md">
              {eventInfo.link1 && (
                <a target="_blank" rel="noopener noreferrer" href={eventInfo.link1} className="bg-blue-100 text-white font-bold py-2 px-4 rounded-full w-[100px] max-w-xs flex flex-row justify-center">
                  <FontAwesomeIcon icon={faLink} className="w-6 h-6 text-blue-500" />
                </a>
              )}
              {eventInfo.link2 && (
                <a target="_blank" rel="noopener noreferrer" href={eventInfo.link2} className="bg-blue-100 text-white font-bold py-2 px-4 rounded-full w-[100px] max-w-xs flex flex-row justify-center">
                  <FontAwesomeIcon icon={faLink} className="w-6 h-6 text-blue-500" />
                </a>
              )}
            </div>
          )}

          <div className="flex flex-col justify-between items-center m-8">
            <div>
              <h1 className="text-center text-3xl my-7 font-semibold">
                Are you willing to join?
              </h1>
              {currentUser ? (<>
                {show ? (
                  <>
                    <div className="flex justify-center mt-4 space-x-4">
                      <button
                        onClick={() => handleButtonClick("Yes")}
                        className={`${selectedOption === "Yes"
                          ? "bg-green-800"
                          : "bg-green-200 hover:bg-green-600"
                          } text-white font-bold py-2 px-4 rounded transition duration-300`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleButtonClick("No")}
                        className={`${selectedOption === "No"
                          ? "bg-red-800"
                          : "bg-red-200 hover:bg-red-600"
                          } text-white font-bold py-2 px-4 rounded transition duration-300`}
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleButtonClick("Maybe")}
                        className={`${selectedOption === "Maybe"
                          ? "bg-blue-800"
                          : "bg-blue-200 hover:bg-blue-600"
                          } text-white font-bold py-2 px-4 rounded transition duration-300`}
                      >
                        Maybe
                      </button>
                    </div>

                    {currentUser?.isAdmin ? (
                      <div className="flex flex-col justify-between items-center m-8">
                        <div>
                          <h1 className="text-center text-3xl my-7 font-semibold">
                            Response Counts of this Event
                          </h1>
                          <div className="flex justify-center mt-4 space-x-4">
                            <div className="bg-green-400 text-white font-bold py-2 px-4 rounded">
                              Yes: {responseCounts.yes}
                            </div>
                            <div className="bg-red-400 text-white font-bold py-2 px-4 rounded">
                              No: {responseCounts.no}
                            </div>
                            <div className="bg-blue-400 text-white font-bold py-2 px-4 rounded">
                              Maybe: {responseCounts.maybe}
                            </div>
                          </div>
                          <button
                            onClick={fetchResponseCounts}
                            className="text-center mt-4 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                          >
                            Refresh Counts
                          </button>
                        </div>
                      </div>) :
                      (
                        <></>
                      )}
                  </>
                ) : (
                  <h5 className="flex gap">
                    Your response <p className="text-red-700 mx-2">{ans}</p> recorded.
                  </h5>
                )}
              </>

              ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                  You must be signed in to submit the response.
                  <Link className="text-red-600 hover:underline" to={"/login"}>
                    Sign In
                  </Link>
                </div>
              )}

            </div>
          </div>


        </>
      ) : (
        <p>Loading...</p>
      )
      }
    </div >


  );
}


/*<div className="p-3 max-w-3xl mx-auto mt-8 min-h-screen">

              <h1 className="text-center text-3xl my-7 font-semibold">
                Let's Participate
              </h1>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {currentUser.isAdmin && (
                  <Select
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contributionType: e.target.value,
                      })
                    }
                  >

                    <option value="Campaigns">Join our Campaigns</option>

                  </Select>
                )}
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                  <TextInput
                    type="text"
                    placeholder="Title"
                    required
                    id="title"
                    className="flex-1"
                    value={eventInfo.eventTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, eventTitle: eventInfo.eventTitle })
                    }
                    disabled // Add the disabled attribute to make it read-only
                  />


                  <Select
                    value={eventInfo.category} // Assuming eventinfo is your state containing fetched data
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  // disabled // Add the disabled attribute to make it read-only
                  >
                    <option value="uncategorized">Select a category</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="bollywood">Bollywood</option>
                    <option value="business">Business</option>
                    <option value="crime">Crime</option>
                    <option value="economy">Economy</option>
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="environment">Environment</option>
                    <option value="events">Events</option>
                    <option value="fashion">Fashion</option>
                    <option value="foreign">Foreign</option>
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="hollywood">Hollywood</option>
                    <option value="international">International</option>
                    <option value="legal">Legal</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="national">National</option>
                    <option value="politics">Politics</option>
                    <option value="religious">Religious</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="stock market">Stock Market</option>
                    <option value="technology">Technology</option>
                    <option value="weather">Weather</option>
                    <option value="other">Other</option>
                  </Select>

                </div>
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
                    onClick={() => handleUploadImage(1)}
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
                      "Upload Image 1"
                    )}
                  </Button>
                </div>
                {imageUploadError && (
                  <Alert color="failure">{imageUploadError}</Alert>
                )}
                {formData.image1 && (
                  <img
                    src={formData.image1}
                    alt="upload"
                    className="w-full h-72 object-cover"
                  />
                )}
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
                    onClick={() => handleUploadImage(2)}
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

                <Button type="submit" gradientDuoTone="cyanToBlue">
                  Publish
                </Button>
                {publishError && (
                  <Alert className="mt-5" color="failure">
                    {publishError}
                    
                  </Alert>
                )}
              </form>
            </div>*/