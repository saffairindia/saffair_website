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
              <Label value="School Name" />
              <TextInput
                type="text"
                placeholder="School Name"
                id="schoolName"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Degree" />
              <TextInput
                type="text"
                placeholder="Degree"
                id="degree"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Field of Study" />
              <TextInput
                type="text"
                placeholder="Field of Study"
                id="fieldOfStudy"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Start Date" />
              <TextInput
                type="date"
                id="startDate"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="End Date" />
              <TextInput
                type="date"
                id="endDate"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Grade" />
              <TextInput
                type="text"
                placeholder="Grade"
                id="grade"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Description" />
              <textarea
                rows="4"
                cols="50"
                id="description"
                onChange={handleChange}
              ></textarea>
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
                    <Spinner size="sm" />
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
