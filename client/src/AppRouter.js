import React from 'react';
import { Routes, Route } from 'react-router-dom';


import PostRequest from './components/PostRequest/PostRequest';
import GetReguest from './components/GetRequest/GetRequest';
import Home from './pages/Home/Home';
import UpdateRequest from './components/UpdateRequest/UpdateRequest';

export default function AppRouter() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/update-request" element={<UpdateRequest />} />
                <Route path="/post-request" element={<PostRequest />} />
                <Route path="/get-request" element={<GetReguest />} />
            </Routes>
        </div>
    )
}
