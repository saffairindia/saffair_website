import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./DashEvents.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  // const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

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

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };
  const handleUpdloadImage = async () => {
    try {
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
            setFormData({ ...formData, eventImage: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const click = () => {
    console.log(formData)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setPublishError(errorData.message || "An error occurred");
        return;
      }

      const data = await res.json();
      setPublishError(null);
      // navigate(`/post/${data.slug}`);
      navigate(`/events`);
      alert("Event created successfully!");

    } catch (error) {
      console.error("Error submitting the form:", error);
      setPublishError("Something went wrong. Please try again later.");
    }
  };


  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  return (
    <div className="p-3 max-w-3xl mx-auto mt-8 min-h-screen">
      <Button onClick={click}>
        clikc me
      </Button>
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create A Event
      </h1>
      <div className="Dropdown">
        {(
          <Select
          required

            onChange={(e) =>
              setFormData({ ...formData, readingType: e.target.value })
            }
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
        )}
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="eventTitle"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, eventTitle: e.target.value })
            }
          />
          <div>
            <TextInput
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextInput
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
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
            onClick={handleUpdloadImage}
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
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.eventImage && (
          <img
            src={formData.eventImage}
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
            setFormData({ ...formData, eventDescription: value });
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
    </div>
  );
}
