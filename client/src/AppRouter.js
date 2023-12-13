import React from 'react';
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

export default function AppRouter() {
    return (
        <div>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/update-request" element={<UpdateRequest />} />
                        <Route path="/post-request" element={<PostRequest />} />
                        <Route path="/get-request" element={<GetReguest />} />
                        <Route path="/delete-request" element={<DeleteRequest />} />
                        <Route path="/playground" element={<Playground />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    )
}
