import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure, setOtpStateId } from '../../redux/user/userSlice';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Oauth from '../../component/oauth/Oauth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error1, setError] = useState()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const sendOtp = async (email) => {
    try {
      const response = await fetch('https://api.mojoauth.com/users/emailotp', {
        method: 'POST',
        headers: {
          'x-api-key': `${process.env.REACT_APP_MOJOAUTH_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send OTP');
      }
      dispatch(setOtpStateId(result.state_id));
      return result.state_id;
    } catch (err) {

      console.error(err);
      throw new Error('Failed to send OTP: ' + err.message);
    }
  };

  const verifyOtp = async () => {
    setLoading2(true)

    try {
      const response = await fetch('https://api.mojoauth.com/users/emailotp/verify', {
        method: 'POST',
        headers: {
          'x-api-key': `${process.env.REACT_APP_MOJOAUTH_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          OTP: otp,
          state_id: formData.stateId
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Verification failed');
      }
      setLoading2(false)
      dispatch(signInSuccess({ ...formData, otpVerified: true }));
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.message));
      setError(err.message)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      setLoading1(true);
      dispatch(signInStart());
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      if (data.isAdmin) {
        const stateId = await sendOtp(data.email);
        setFormData({ ...data, stateId });
        setShowOtpInput(true);
        setError(null)
      } else {
        dispatch(signInSuccess(data));
        navigate('/createblog');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      setError(error.message);
    } finally {
      setLoading1(false);
    }

  };


  return (
    <div className="h-full my-40">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <img src="./assets/logo.png" alt="" className="w-36" />
          </Link>
          <p className="text-lg mt-5 font-bold">Welcome to Saffair</p>
        </div>
        {/* right */}

        <div className="flex-1">
          {!showOtpInput ? (

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
                disabled={loading1}
              >
                {loading1 ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {error1 && <Alert color="failure" className="mt-5">{error1}</Alert>}

              <Oauth />
              <div className='flex flex-col md:flex-row justify-between'>
              <Link to="/forget-password" className="underline text-sm text-blue-900">
                Forget Password?
              </Link>
              <div className=" text-sm ">
                <span>Don't have a account?</span>
                <Link to="/register" className="underline ml-1 text-blue-900">
                  Register
                </Link>
              </div>
              </div>
            </form>) : (
            <>
              <div className="flex flex-col gap-4">
                <div>
                  <Label value="Enter OTP sent to your email" />
                  <TextInput
                    type="text"
                    placeholder="Enter OTP"

                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Button
                  gradientDuoTone="cyanToBlue"
                  outline
                  onClick={verifyOtp}
                  disabled={loading2}
                >
                  {loading2 ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Verifying...</span>
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
                {error1 && <Alert color="failure" className="mt-5">{error1}</Alert>}

              </div></>
          )}


        </div>
      </div>
    </div>
  );
}