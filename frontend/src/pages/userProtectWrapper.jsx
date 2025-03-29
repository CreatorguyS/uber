import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirect if token is missing
            return;
        }

        const controller = new AbortController();

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal,
                });

                if (response.status === 200) {
                    setUser(response.data.user);
                    setLoading(false);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching user profile:", error);
                    navigate('/login');
                }
            }
        };

        fetchUser();

        return () => controller.abort(); // Cleanup request on unmount
    }, [token, navigate]);

    if (!token) {
        return null; // Prevent rendering protected content
    }

    if (isLoading) {
        return <div>Loading...</div>; // Show loading message while fetching user data
    }

    return <>{children}</>;
};

export default UserProtectWrapper;