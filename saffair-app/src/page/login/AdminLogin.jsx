import React, { useState, useEffect } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice";

const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [verificationSuccess2, setVerificationSuccess2] = useState(false);
    const [stateId, setStateId] = useState('');
    const [pass, setPass] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleOtpChange = (e) => setOtp(e.target.value);

    const sendOtp = async () => {
      

        if (email === `${process.env.REACT_APP_ADMIN_EMAIL}`) {
            setOtpLoading(true);
            setError('');
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
                if (response.ok) {
                    setOtpSent(true);
                    setStateId(result.state_id);
                    console.log(result);
                } else {
                    throw new Error(result.message || 'Something went wrong');
                }
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setOtpLoading(false);
            }
        } else {
            setError('Invalid admin email');
        }
    };

    const verifypass = async (e) => {
        e.preventDefault();
        if (!email || !pass) {
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
                body: JSON.stringify({ email, password: pass }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }

            const data = await res.json();
            dispatch(signInSuccess(data));
            setVerificationSuccess2(true);
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    const verifyOtp = async () => {
        setVerificationLoading(true);
        setError('');
        try {
            const response = await fetch('https://api.mojoauth.com/users/emailotp/verify', {
                method: 'POST',
                headers: {
                    'x-api-key': `${process.env.REACT_APP_MOJOAUTH_API_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ OTP: otp, state_id: stateId }),
            });
            const result = await response.json();
            if (response.ok) {
                setVerificationSuccess(true);
                console.log(result);
            } else {
                throw new Error(result.message || 'Verification failed');
            }
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setVerificationLoading(false);
        }
    };

    // Use useEffect to navigate when both verifications are successful
    useEffect(() => {
        if (verificationSuccess && verificationSuccess2) {
            navigate('/');
        }
    }, [verificationSuccess, verificationSuccess2, navigate]);

    const handlesubmit = (e) => {
        verifyOtp();
        verifypass(e);
    }

    return (
        <div className="h-full my-40 flex flex-col items-center">
            <div>
                <p className='self-center font-extrabold text-4xl text-teal-400 mb-16'>
                    Admin Login
                </p>
            </div>
            <div className="flex p-3 w-full max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1 w-3/5">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <img src="./assets/logo.png" alt="" className="w-36" />
                    </Link>
                    <p className="text-lg mt-5 font-bold">Welcome to Saffair</p>
                </div>
                <div className="flex flex-col gap-2 w-full p-4 md:w-2/5">
                    <div>
                        <Label value="Admin email" />
                        <TextInput
                            type="email"
                            placeholder="name@company.com"
                            id="email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <Button
                        gradientDuoTone="cyanToBlue"
                        outline
                        type="button"
                        disabled={otpLoading}
                        onClick={sendOtp}
                        className='mb-8'
                    >
                        {otpLoading ? (
                            <>
                                <Spinner size="sm" />
                                <span className="pl-3">Loading...</span>
                            </>
                        ) : (
                            "Send OTP"
                        )}
                    </Button>
                    {otpSent && (
                        <div>
                            <div className='mb-4'>
                                <Label value="Your password" />
                                <TextInput
                                    type="password"
                                    placeholder="******"
                                    id="password"
                                    onChange={(e) => setPass(e.target.value)}
                                    maxLength={6} 
                                />
                            </div>
                            <Label value="Enter OTP" />
                            <TextInput
                                required
                                type="password"
                                placeholder="**********"
                                id="otp"
                                value={otp}
                                onChange={handleOtpChange}
                            />
                            <Button
                                gradientDuoTone="cyanToBlue"
                                outline
                                type="button"
                                disabled={verificationLoading}
                                onClick={handlesubmit}
                                className='mt-4 w-full'
                            >
                                {verificationLoading ? (
                                    <>
                                        <Spinner size="sm" />
                                        <span className="pl-3">Loading...</span>
                                    </>
                                ) : (
                                    "Verify & Login"
                                )}
                            </Button>
                        </div>
                    )}
                    {(verificationSuccess && verificationSuccess2) && <p className="text-green-500">Admin verified successfully!</p>}
                    {error && <Alert color="failure">{error}</Alert>}
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
