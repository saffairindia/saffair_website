import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import {   signInWithPhoneNumber  } from "firebase/auth";
import {  auth } from "../../firebase.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier } from "firebase/auth";
import { addPhoneNumber, addUser, changeStateFalse } from "./otpSlice.js";
import toast from "react-hot-toast";
import { useRef } from "react"; 
export default function Verify() {
  const dispatch = useDispatch();
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({
    education: [],
    workExperience: [],
  });
  const [showForm, setShowForm] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [users, setUsers] = useState([]);
  const recaptchaRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/getusers`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            // setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  
  const toggleIsVerfiy = async (userId) => {
    try {
      // Make a PUT request to the backend API endpoint
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/verify/${userId}`,
        {
          method: "PUT",
          credentials: "include", // If needed
        }
      );
      const data = await res.json();
      if (res.ok) {
        // Update the user list with updated isAdmin status
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isVerify: !user.isVerify } : user
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false); // Hide any previous alert messages
    setShowForm(false); // Hide the form
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    console.log(formData);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
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
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        setShowAlert(true);
      } else {
        dispatch(updateSuccess(data));
        setShowAlert(true);
        setUpdateUserSuccess(
          "YOU HAVE SUCCESSFULLY SUBMITTED YOUR RESPONSE ! "
        );
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
      setShowAlert(true);
    }
  };

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const sendOTP = async () => {
    var ph = phone.substring(2);
    setFormData({
      ...formData,
      number: ph,
    });
    console.log(phone);
    if (phone === "") {
      toast.error("please enter a phone number");
      return;
    }

    if (isButtonDisabled) {
      return;
    }

    var recaptcha;
    try {
      setIsButtonDisabled(true);
      recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+" + phone,
        recaptcha
      );
      toast.success("OTP sent successfully");
      console.log(confirmationResult);
      dispatch(addUser(confirmationResult));
      setVerificationId(confirmationResult.verificationId);
      window.confirmation = confirmationResult;

      dispatch(addPhoneNumber(phone));
      dispatch(changeStateFalse());
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          toast.error("Too many requests. Please try again later.");
          break;
        case "auth/invalid-phone-number":
          toast.error("The phone number is invalid.");
          break;
        default:
          toast.error("Something went wrong. Please try again later.");
          break;
      }
      recaptcha = "";
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleVerifyCode = async () => {
    var code = verificationCode;
    if (!window.confirmation) {
      console.error("Confirmation result is not available. Please ensure that OTP was sent successfully.");
      return;
    }

    window.confirmation.confirm(code)
      .then((result) => {
        const user = result.user;
        console.log("User signed in successfully:", user);
        setIsVerified(true);
      })
      .catch((error) => {
        console.error("Error during confirmationResult.confirm", error);
      });
  };

  

  const [ferrorMessage, setErrorMessage] = useState('');

  const formhandle = (e) => {
    e.preventDefault();
    console.log(formData);

    if (isVerified) {
      toggleIsVerfiy(currentUser._id);
      handleSubmit(e);
      setShowb(false);
    } else {
      setErrorMessage('Please verify your number');
    }
  };

  const [showb, setShowb] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {currentUser.isReq ? (
        <Alert className="text-center">SUBMITTED</Alert>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
          {showb && (
            <form className="flex flex-col space-y-6" onSubmit={formhandle}>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Verification</h2>

              <div className="flex flex-col items-center mx-2">
                <div className="w-full sm:w-1/2 px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <TextInput
                    type="text"
                    placeholder="First Name"
                    defaultValue={currentUser.firstName}
                    id="firstName"
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="w-full sm:w-1/2 px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <TextInput
                    type="text"
                    defaultValue={currentUser.lastName}
                    placeholder="Last Name"
                    id="lastName"
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="w-full sm:w-1/2 px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID<span className="text-red-500 ml-1">*</span>
                  </label>
                  <TextInput
                    type="text"
                    placeholder="name@company.com"
                    id="email"
                    value={currentUser.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="w-full sm:w-1/2 px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex items-center  lg:flex-row gap-3 flex-colspace-x-2">
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={(e) => setPhone(e)}
                      defaultValue={currentUser.number}
                      placeholder="+91 xxxxx-xxxxx"
                      className="flex-grow"
                      inputStyle={{ width: '100%' }}
                    />
                    <Button
                      className={` w-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      onClick={sendOTP}
                      disabled={isButtonDisabled}
                    >
                      {isButtonDisabled ? "Sending..." : "Send OTP"}
                    </Button>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Verification<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex flex-col lg:flex-row gap-3">
                <TextInput
                 type="text"
                 placeholder="------"
                 id="code"
                 value={verificationCode}
                 maxLength={6}
                 onChange={(e) => setVerificationCode(e.target.value)}
                 required
                 className="flex-grow"
                />
                 <Button
                      className="w-36  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleVerifyCode}
                      disabled={isVerifyButtonDisabled}
                    >
                      {isVerifyButtonDisabled ? "Checking..." : "Verify OTP"}
                    </Button>
                </div>
                  {isVerified && <div className="text-green-500 mt-2 text-center">Verified</div>}

              </div>

               
              </div>

              <div id="recaptcha" className="w-full"></div>



              <div className="flex flex-col items-center mt-6">
                {ferrorMessage && <div className="text-red-500 mb-4">{ferrorMessage}</div>}
                <Button
                  gradientDuoTone="cyanToBlue"
                  outline
                  disabled={loading}
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-1">Loading...</span>
                    </>
                  ) : (
                    "Submit to Verify"
                  )}
                </Button>
              </div>
            </form>
          )}

          {showAlert && (
            <Alert
              className="mt-5"
              color={errorMessage ? "failure" : "success"}
            >
              {errorMessage
                ? errorMessage
                : "User's profile updated successfully and wait for the approval"}
            </Alert>
          )}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
