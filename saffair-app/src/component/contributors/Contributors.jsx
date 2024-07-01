import { Alert, Button, Spinner, TextInput, Textarea } from "flowbite-react";
import {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { ToggleSwitch } from "flowbite-react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  
} from "../../redux/user/userSlice";
import { getAuth, signInWithPhoneNumber, } from "firebase/auth";
import { app,  } from "../../firebase.js"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier } from "firebase/auth";
import { addPhoneNumber, addUser, changeStateFalse } from "./otpSlice.js";
import toast from "react-hot-toast";
import Education from "./education.jsx";
import WorkExperience from "./WorkExperience.jsx";
import Pincode from 'react-pincode';
const genderOptions = [
  { value: "", label: "Select Gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export default function Contributors() {

  const dispatch = useDispatch();

  const auth = getAuth(app);


  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const [showEducationWork, setShowEducationWork] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({
    education: [],
    workExperience: [],


  });
  const [showForm, setShowForm] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [users, setUsers] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false); // Hide any previous alert messages
    setShowForm(false); // Hide the form
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    console.log(formData)
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
  const toggleIsReq = async (userId) => {
    try {
      // Make a PUT request to the backend API endpoint
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/toggleReq/${userId}`,
        {
          method: "PUT",
          credentials: "include", // If needed
        }
      );
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        // Update the user list with updated isAdmin status
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isReq: !user.isReq } : user
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);



  const [isVerified, setIsVerified] = useState(false);

  const [phone, setPhone] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const sendOTP = async () => {
    setFormData({
      ...formData,
      number: phone,
    });
    console.log(phone)
    if (phone == "") {
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
      toast.success("otp sended successfully");
      console.log(confirmationResult)
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
    var code = verificationCode
    if (!window.confirmation) {
      console.error("Confirmation result is not available. Please ensure that OTP was sent successfully.");
      return;
    }

    window.confirmation.confirm(code)
      .then((result) => {
        // User signed in successfully
        const user = result.user;
        console.log("User signed in successfully:", user);
        setIsVerified(true)
        // ... Do something with the signed-in user info
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.error("Error during confirmationResult.confirm", error);
      });
  };
  const handlePincodeChange = (data) => {
    setFormData({
      ...formData,
      city: data.city,
      state: data.stateName,
      pincode: data.pincode
    });
    console.log(data)
  };

  const [ferrorMessage, setErrorMessage] = useState(''); // State to manage error message

  const formhandle = (e) => {
    e.preventDefault()
    console.log(formData)

    if (isVerified) {
      handleSubmit(e);
      toggleIsReq(currentUser._id);
      setShowb(false)
    } else {
      setErrorMessage('Please verify your number');

    }

  }
  const [showb, setShowb] = useState(true)
  return (
    <div className="w-full ">
      {currentUser.isReq ? (
        <Alert>SUBMITTED</Alert>
      ) : (
        <div className="flex-1 w-screen md:w-auto">
          {showb && <form
            className="flex-col gap-4 mx-4"

          >
            <div className="pdetails">
              <p className="pdetailstag mb-4 font-bold">Personal details</p>

              <div className="thenames grid grid-cols-1 mb-2 md:grid-cols-2 sm:grid-cols-2 ">
                <div>
                  <label>
                    First Name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <TextInput
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>
                    Last Name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <TextInput
                    type="text"
                    placeholder="last Name"
                    id="lastName"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <div className="phone-container">
                    <div className="phone-title">phone no. <span className="text-red-500 ml-1">*</span></div>
                    <div className="phone-subcontainer flex flex-col gap-8 sm:flex-row">
                      <div className="phone-filed ">
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e);
                            setFormData(prevState => ({
                              ...prevState,
                              number: e
                            }));
                          }}

                          placeholder="+91 xxxxx-xxxxx"
                          className="mobile "
                        />
                      </div>
                      <div className="phone-btn">
                        <Button
                          style={{ height: '48px', width: '128px' }}

                          id="signup-btn"
                          disabled={isButtonDisabled}
                          onClick={() => sendOTP()}
                          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span>{isButtonDisabled ? "Sending..." : "Send code"}</span>
                        </Button>



                      </div>
                    </div>
                  </div>
                  <div id="recaptcha"></div>

                </div>

                <div className="flex-col flex justify-between">
                  <div>
                    phone verification <span className="text-red-500 ml-1">*</span>
                  </div>
                  <div className="flex flex-col gap-8 sm:flex-row">
                    <TextInput
                      type="text"
                      placeholder="------"
                      id="firstName"
                      value={verificationCode}
                      maxLength={6}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />

                    <div className="flex-row">

                      <Button
                        style={{ height: '48px', width: '128px' }}
                        onClick={handleVerifyCode} disabled={isVerifyButtonDisabled}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {isVerifyButtonDisabled ? "Checking..." : "Verify OTP"}

                      </Button>
                      <div>
                        {isVerified ? 'Verified' : null}
                      </div>
                    </div>

                  </div>
                </div>
                <div>
                  <label>
                    Email ID<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex flex-col gap-8 sm:flex-row">
                    <TextInput
                      type="text"
                      placeholder="name@company.com"
                      id="email"
                      value={currentUser.email}
                      onChange={handleChange}
                      required
                      style={{ width: '300px' }} // Adjust the width value as needed

                    />

                  </div>
                </div>

              </div>


              <label className="font-semibold">Location</label>
              <div className="flex flex-col md:flex-row justify-start gap-4">

                <div>
                  <label >
                    Pincode
                  </label>
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
                      className="
                    block
                    w-full
                    rounded-md
                    px-3
                    py-2
                    border border-gray-300
                   shadow-sm"/>
                  </div>





                </div>
                <div>
                  <label>
                    City
                  </label>
                  <TextInput
                    type="text"
                    placeholder="City"
                    id="city"
                    onChange={handleChange}
                    value={formData.city}
                    readOnly
                  />
                </div>
                <div>
                  <label>
                    State
                  </label>
                  <TextInput
                    type="text"
                    placeholder="State"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="bio mb-3 grid sm:grid-cols-2">
                <div>
                  <label>
                    Bio
                  </label>
                  <br />
                  <Textarea
                    rows="4"
                    cols="40"
                    id="bio"
                    value={bio}
                    // onChange={handleChange}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <p className="text-gray-500 text-xs">
                    {200 - bio.length} characters remaining
                  </p>
                </div>
              </div>
              <div className="sociallinks">
                <label>Social Media Links</label>
                <div className="personal-details grid grid-cols-1 mt-2 mb-2 md:grid-cols-2 sm:grid-cols-2 ">
                  <div className="facebookpart flex">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-2xl mr-2 mt-2"
                    />
                    <TextInput
                      type="text"
                      placeholder="Facebook"
                      id="facebook"
                      name="facebook"
                      className="w-full"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="twitterpart flex">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="text-2xl mr-2 mt-2"
                    />
                    <TextInput
                      type="text"
                      placeholder="Twitter"
                      id="twitter"
                      name="twitter"
                      className="w-full"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="instapart flex">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-2xl mr-2 mt-2"
                    />
                    <TextInput
                      type="text"
                      placeholder="Instagram"
                      id="instagram"
                      name="instagram"
                      className="w-full ml-1"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="linkedinpart flex">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="text-2xl mr-2 mt-2"
                    />
                    <TextInput
                      type="text"
                      placeholder="LinkedIn"
                      id="linkedin"
                      name="linkedin"
                      className="w-full ml-1"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <ToggleSwitch
                  className="my-3"
                  checked={showEducationWork}
                  label="job alert"
                  onChange={() => setShowEducationWork(!showEducationWork)}
                />
              </div>
            </div>

            {showEducationWork && (
              <>
                <div className="personaldetails mt-3">
                  <p className="personaltag mb-4 font-bold">Personal Details</p>
                  <div className="mb-2">
                    <div className="grid grid-cols-1 mb-3 md:flex sm:grid-cols-2 gap-5 ">
                      <div>
                        <label>
                          Date of Birth

                        </label>
                        <TextInput
                          type="date"
                          id="dob"
                          onChange={handleChange}

                        />
                      </div>
                      <div>
                      </div>
                      <div>
                        <label>
                          Gender
                        </label><br />
                        <select id="gender" onChange={handleChange} >
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

                <WorkExperience updateWorkExperienceData={updateWorkExperienceData} />

              </>
            )}

            <div className="justify-center m-3">
              {ferrorMessage && <div>{ferrorMessage}</div>}

              <Button
                gradientDuoTone="cyanToBlue"
                outline
                disabled={loading}
                onClick={(e) => { formhandle(e) }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-1">Loading...</span>
                  </>
                ) : (
                  "Submit form"
                )}
              </Button>
            </div>
          </form>}

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
