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

// Define the options for the employment type dropdown
const employmentTypes = [
  { value: "", label: "Select Employment Type" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Self-employed", label: "Self-employed" },
  { value: "Freelance", label: "Freelance" },
  { value: "Internship", label: "Internship" },
  { value: "Trainee", label: "Trainee" },
];

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
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
            <div>
              <Label value="Position" />
              <TextInput
                type="text"
                placeholder="Content Writer"
                id="position"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Employment Type " />
              <select id="employmentType" onChange={handleChange}>
                {employmentTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label value="Company Name" />
              <TextInput
                type="text"
                placeholder="Company Name"
                id="companyName"
                onChange={handleChange}
              />
            </div>
            <Label value="Company Location " />
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
            <div>
              <Label value="Joining Date " />
              <TextInput
                type="date"
                id="joiningDate"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="End Date " />
              <TextInput
                type="date"
                id="endDate"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Industry" />
              <TextInput
                type="text"
                placeholder="Industry"
                id="industry"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Description " />
              <textarea
                rows="4"
                cols="50"
                id="description"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <Label value="Job Alert " />
              <input
                type="checkbox"
                id="jobAlert"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Platform Joining Date" />
              <TextInput
                type="date"
                id="platformJoiningDate"
                disabled={true}
              />
            </div>
            <div className="flex justify-center gap-3">
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
