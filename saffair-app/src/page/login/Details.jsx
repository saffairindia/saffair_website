import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import OAuth from "../../component/oauth/Oauth";

// Define the options for the dropdown
const websiteTypes = [
  { value: "", label: "Select Website Type" },
  { value: "personal", label: "Personal" },
  { value: "company", label: "Company" },
  { value: "blog", label: "Blog" },
  { value: "rss", label: "RSS Feed" },
  { value: "portfolio", label: "Portfolio" },
  { value: "other", label: "Other" },
];

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define the handleChange function to update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <img src="./assets/logo.png" alt="" className="w-24" />
          </Link>
          <p className="text-sm mt-5">welcome to the saffair weather app</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="thenames flex gap-2">
              <div>
                <Label value="First Name" />
                <TextInput
                  type="name"
                  placeholder="Nehul"
                  id="fname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Last Name" />
                <TextInput
                  type="name"
                  placeholder="Vasava"
                  id="lname"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label value="Date of Birth" />
              <TextInput
                type="date"
                id="dob"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Gender" />
              <div className="flex gap-5">
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                  />
                  <Label value="Male" htmlFor="male" />
                </div>
                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                  />
                  <Label value="Female" htmlFor="female" />
                </div>
                <div>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                  />
                  <Label value="Other" htmlFor="other" />
                </div>
              </div>
            </div>
            <div>
              <Label value="Mobile number" />
              <TextInput
                type="number"
                placeholder="7777777777"
                id="mobnumber"
                maxLength={10}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Website URL" />
              <TextInput
                type="url"
                placeholder="xyz.com"
                id="weburl"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Website Type" />
              <div>
                {/* Dropdown menu */}
                <select id="websiteType" onChange={handleChange}>
                  {/* Mapping over the options to create dropdown options */}
                  {websiteTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label value="Profile Picture" />
              <TextInput
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label value="Country" />
                <TextInput
                  type="text"
                  placeholder="Country"
                  id="country"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="City" />
                <TextInput
                  type="text"
                  placeholder="City"
                  id="city"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="State" />
                <TextInput
                  type="text"
                  placeholder="State"
                  id="state"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Pincode" />
                <TextInput
                  type="text"
                  placeholder="Pincode"
                  id="pincode"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                gradientDuoTone="cyanToBlue"
                outline
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loadder/>
                    <span className="pl-1">Loading...</span>
                  </>
                ) : (
                  "Previous"
                )}
              </Button>
              <Button
                gradientDuoTone="cyanToBlue"
                outline
                type="submit"
                disabled={loading}
              >
                Next
              </Button>
            </div>
            <OAuth />
          </form>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
