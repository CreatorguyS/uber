import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token'); 
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        const controller = new AbortController(); // ✅ Prevent memory leaks
        const fetchCaptain = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal, // ✅ Use the AbortController signal
                });

                if (response.status === 200) {
                    setCaptain(response.data.captain);
                    setLoading(false);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching captain profile:", error);
                    navigate('/captain-login');
                }
            }
        };

        fetchCaptain();

        return () => {
            controller.abort(); // ✅ Cleanup function to avoid memory leaks
        };
    }, [token, navigate, setCaptain]);

    if (!token) {
        return null; // Prevent rendering protected content
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
