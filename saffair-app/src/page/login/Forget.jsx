import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure, setOtpStateId } from '../../redux/user/userSlice';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Oauth from '../../component/oauth/Oauth';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const Forget = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/recovery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                throw new Error('Failed to get action code settings');
            }

            const data = await res.json();

            try {
                await sendPasswordResetEmail(auth, email,data.actionCodeSettings);
                setMessage('Password reset email sent. Check your inbox.');
            } catch (error) {
                setError(error.message);
            }
        } catch (error) {
            setError(error.message);
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

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label value="Enter your email" />
                                <TextInput
                                    type="email"
                                    placeholder="enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    value={email}


                                />
                            </div>
                            <Button
                                gradientDuoTone="cyanToBlue"
                                outline
                                type='submit'
                            >
                                Reset Password
                            </Button>
                        </div>

                    </form>
                    {message && <Alert color="blue" className="mt-5">{message}</Alert>}
                    {error && <Alert color="failure" className="mt-5">{error}</Alert>}



                </div>
            </div>
        </div >
    )
}

export default Forget