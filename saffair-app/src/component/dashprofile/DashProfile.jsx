import {
  Alert,
  Button,
  Modal,
  ModalBody,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToggleSwitch } from "flowbite-react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../../redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareXTwitter,
  faLinkedin,
  faSquareWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import Pincode from "react-pincode";
import Education from "../contributors/education";
import WorkExperience from "../contributors/WorkExperience";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function DashProfile() {
  // const [biofield, setBiofield] = useState("");
  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [showEducationWork, setShowEducationWork] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    if (currentUser.isVerify) {
      setIsVerified(true);
    }
  }, [currentUser]);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePincodeChange = (data) => {
    setFormData({
      ...formData,
      city: data.city,
      state: data.stateName,
      pincode: data.pincode,
    });
    console.log(data);
  };
  const updateEducationData = (educationDetails) => {
    setFormData({
      ...formData,
      education: educationDetails,
    });
  };

  const updateWorkExperienceData = (workExperienceDetails) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: workExperienceDetails,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.error));
        setUpdateUserError(data.error);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/delete/${currentUser._id}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/signout`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-[624px] mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                    })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
              }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {!currentUser.isAdmin && (
          <div className="flex justify-center mt-4">
            <div
              className={`
    flex flex-col items-center
    max-w-sm w-full px-4 py-3 rounded-lg shadow-md
   ${isVerified
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
                }
 `}
            >
              <span className="font-bold text-lg mb-2">
                {isVerified ? "Verified" : "Unverified"}
              </span>
              <div className="flex flex-row items-center justify-center space-x-2 text-center">
                <p className="text-sm">
                  {isVerified
                    ? "Your account has been successfully verified."
                    : "Please verify your account to redeem Voucher."}
                </p>
                {!isVerified && (
                  <Link
                    to="/dashboard?tab=verify"
                    className="inline-flex items-center"
                  >
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="ml-1"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
        <TextInput
          type="text"
          id="firstName"
          placeholder="first name"
          defaultValue={currentUser.firstName}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="lastName"
          placeholder="last name"
          defaultValue={currentUser.lastName}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <TextInput
          type="number"
          defaultValue={currentUser.number}
          id="number"
          max={10}
          placeholder="phone number"
          onChange={handleChange}
        />
        <label className="font-semibold">Location</label>
        <div className="flex flex-col md:flex-row justify-start gap-4">
          <div>
            <label>Pincode</label>
            <div>
              <Pincode
                placeholder="Pincode"
                id="pincode"
                getData={handlePincodeChange}
                invalidError="Please check pincode"
                lengthError="Check length"
                showArea={false}
                showState={false}
                showDistrict={false}
                showCity={false}
                defaultValue={currentUser.pincode}
                value={formData.pincode}
                className="
                    block
                    w-full
                    rounded-md
                    px-3
                    py-2
                    border border-gray-300
                   shadow-sm"
              />
            </div>
          </div>
          <div>
            <label>City</label>
            <TextInput
              type="text"
              placeholder="City"
              id="city"
              onChange={handleChange}
              value={formData.city}
              defaultValue={currentUser.city}
              readOnly
            />
          </div>
          <div>
            <label>State</label>
            <TextInput
              type="text"
              placeholder="State"
              id="state"
              defaultValue={currentUser.state}
              value={formData.state}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>

        {(currentUser.isAdmin || currentUser.isContributor) && (
          <>
            <div className="bio mb-1">
              <Textarea
                type="textarea"
                rows="4"
                cols="40"
                id="bio"
                maxLength={200}
                onChange={handleChange}
                placeholder="bio"
                defaultValue={currentUser.bio}
                required
              />
            </div>
            <div className="sociallinks">
              <label>Social Media Links</label>

              <div className="facebookpart flex gap-2 mb-2 mt-2">
                <FontAwesomeIcon
                  icon={faSquareFacebook}
                  className="text-2xl mt-2"
                />
                <TextInput
                  type="text"
                  placeholder="Facebook"
                  id="facebook"
                  name="facebook"
                  className="w-full"
                  onChange={handleChange}
                  defaultValue={currentUser.facebook}
                />
              </div>

              <div className="twitterpart flex gap-2 mb-2">
                <FontAwesomeIcon
                  icon={faSquareXTwitter}
                  className="text-2xl mt-2"
                />
                <TextInput
                  type="text"
                  placeholder="Twitter"
                  id="twitter"
                  name="twitter"
                  className="w-full"
                  onChange={handleChange}
                  defaultValue={currentUser.twitter}
                />
              </div>

              <div className="instapart flex gap-2 mb-2 ">
                <FontAwesomeIcon
                  icon={faSquareInstagram}
                  className="text-2xl mt-2"
                />
                <TextInput
                  type="text"
                  placeholder="Instagram"
                  id="instagram"
                  name="instagram"
                  className="w-full ml-1"
                  onChange={handleChange}
                  defaultValue={currentUser.instagram}
                />
              </div>

              <div className="linkedinpart flex gap-2 mb-2">
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl mt-2" />
                <TextInput
                  type="text"
                  placeholder="LinkedIn"
                  id="linkedin"
                  className="w-full ml-1"
                  name="linkedin"
                  onChange={handleChange}
                  defaultValue={currentUser.linkedin}
                />
              </div>

              <ToggleSwitch
                className="my-3"
                checked={showEducationWork}
                label="job alert"
                onChange={() => setShowEducationWork(!showEducationWork)}
              />
              {showEducationWork && (
                <>
                  <div className="personaldetails mt-3 w-5/3">
                    <p className="personaltag mb-4 font-bold">
                      Personal Details
                    </p>
                    <div className="mb-2">
                      <div className="grid grid-cols-1 mb-3 md:flex sm:grid-cols-2 gap-5 ">
                        <div>
                          <label>Date of Birth</label>
                          <TextInput
                            type="date"
                            id="dob"
                            onChange={handleChange}
                          />
                        </div>
                        <div></div>
                        <div>
                          <label>Gender</label>
                          <br />
                          <select id="gender" onChange={handleChange}>
                            {genderOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="hr-line border-1 border-black mt-3 opacity-30 mb-3"></hr>

                  <Education updateEducationData={updateEducationData} />

                  <hr className="hr-line border-1 border-black mt-3 opacity-30 mb-3"></hr>

                  <WorkExperience
                    updateWorkExperienceData={updateWorkExperienceData}
                  />
                </>
              )}
            </div>
          </>
        )}
        <Button
          type="submit"
          gradientDuoTone="cyanToBlue"
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/createblog"}>
            <Button
              type="button"
              gradientDuoTone="cyanToBlue"
              outline
              className="w-full"
            >
              Create A Blog
            </Button>
          </Link>
        )}
        {currentUser.isContributor && (
          <Link to={"/createblog"}>
            <Button
              type="button"
              gradientDuoTone="cyanToBlue"
              outline
              className="w-full"
            >
              Create A Blog
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        {!currentUser.isAdmin && (
          <span onClick={() => setShowModal(true)} className="cursor-pointer">
            Delete Account
          </span>
        )}
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
