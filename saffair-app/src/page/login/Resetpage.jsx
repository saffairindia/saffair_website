import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/verify-reset-token?token=${token}`);
                const data = await res.json();
                setTokenValid(data.valid);
                if (!data.valid) {
                    setError('Invalid or expired reset token');
                }
            } catch (error) {
                setError('Error verifying token');
            }
        };

        if (token) {
            verifyToken();
        } else {
            setError('No reset token provided');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password, confirmPassword }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                setTimeout(() => navigate('/signin'), 3000);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (error) {
            setError('Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    if (!tokenValid) {
        return (
            <div className="h-full my-40">
                <Alert color="failure">{error}</Alert>
            </div>
        );
    }

    return (
        <div className="h-full my-40">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <Label value="New Password" />
                            <TextInput
                                type="password"
                                placeholder="Enter new password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                value={password}
                            />
                        </div>
                        <div>
                            <Label value="Confirm New Password" />
                            <TextInput
                                type="password"
                                placeholder="Confirm new password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                value={confirmPassword}
                            />
                        </div>
                        <Button
                            gradientDuoTone="cyanToBlue"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <Spinner size="sm" /> : 'Reset Password'}
                        </Button>
                    </form>
                    {message && <Alert color="success" className="mt-5">{message}</Alert>}
                    {error && <Alert color="failure" className="mt-5">{error}</Alert>}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;