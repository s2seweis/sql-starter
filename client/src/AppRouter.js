import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PostRequest from './components/PostRequest/PostRequest';
import GetReguest from './components/GetRequest/GetRequest';
import Home from './pages/Home/Home';
import UpdateRequest from './components/UpdateRequest/UpdateRequest';
import Playground from './components/Playground/Playground';
import RegisterForm from './components/Authentication/Register/Register';
import LoginForm from './components/Authentication/Login/Login';
import DeleteRequest from './components/DeleteRequest/DeleteRequest';
import Layout from './layout/Layout';
import ProtectedRoute from './routes/ProtectedRoutes';
import UserProfile from './components/UserProfile/UserProfile';
import { jwtDecode } from "jwt-decode";
import ContactInformation from './components/ContactInformation/ContactInformation';

export default function AppRouter() {

    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        // Function to get and decode the token
        const getDecodedToken = () => {
            // Get the JWT from local storage
            const token = localStorage.getItem('token');

            // Check if the token exists
            if (token) {
                try {
                    // Decode the token using jwt-decode
                    const decodedToken = jwtDecode(token);

                    // Set the decoded token in the state
                    setDecodedToken(decodedToken);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setDecodedToken(null); // Set null in case of an error
                }
            } else {
                console.error('Token not found in local storage.');
                setDecodedToken(null); // Set null if the token is not found
            }
        };

        // Call the function when the component mounts
        getDecodedToken();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Router>
                <Layout>
                    <Routes>

                        <Route element={<ProtectedRoute />}>

                            <Route path="/" element={<Home />} />
                            <Route path="/update-request" element={<UpdateRequest />} />
                            <Route path="/post-request" element={<PostRequest />} />
                            <Route path="/get-request" element={<GetReguest />} />
                            <Route path="/delete-request" element={<DeleteRequest />} />
                            <Route path="/playground" element={<Playground />} />
                            <Route path="/userprofile" element={<UserProfile userid={decodedToken?.user_id} />} />
                            <Route path="/contact-informations" element={<ContactInformation userid={decodedToken?.user_id} />} />
                        </Route>

                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    )
}
