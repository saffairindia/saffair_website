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
  const [error, setError] = useState('')
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Email:", formData.email);
    console.log("Admin Email from Env:", process.env.REACT_APP_ADMIN_EMAIL);
  
    // Check if email does not match the admin email
    if (formData.email !== process.env.REACT_APP_ADMIN_EMAIL) {
      if (!formData.email || !formData.password) {
        return dispatch(signInFailure("Please fill all the fields"));
      }
  
      try {
        dispatch(signInStart());
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
  
        // Check if response is not okay (status >= 400)
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
  
        // Response is okay, proceed
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate("/");
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    } else {
      // Set error state or handle admin-specific logic
      setError("Go to admin login");
    }
  };

  const [payload, setPayload] = useState(null)

  return (
    <div className="h-full my-40">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <img src="./assets/logo.png" alt="" className="w-36" />
          </Link>
          <p className="text-lg mt-5 font-bold">Welcome to Saffair</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="cyanToBlue"
              outline
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
            <OAuth />
            <Link to="/adminlogin">
              <Button
                gradientDuoTone="maroonToGold"
                outline
                type="submit"
                disabled={loading}
                className="border-2 border-dashed border-teal-500 hover:bg-gray-100 w-full h-10 text-lg font-semibold"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Admin Login"
                )}
              </Button>
            </Link>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </div>
          {errorMessage && (
            <div className="mt-5 text-red-500">invalid credentials</div>
          )}
          {error && (
            <div className="mt-5 text-red-500">{error}</div>
          )}


        </div>
      </div>
    </div>
  );
}
