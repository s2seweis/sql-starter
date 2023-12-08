import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import PostRequest from './components/PostRequest/PostRequest';
import GetReguest from './components/GetRequest/GetRequest';
import Home from './pages/Home/Home';
import UpdateRequest from './components/UpdateRequest/UpdateRequest';
import Playground from './components/Playground/Playground';

export default function AppRouter() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/update-request" element={<UpdateRequest />} />
                    <Route path="/post-request" element={<PostRequest />} />
                    <Route path="/get-request" element={<GetReguest />} />
                    <Route path="/playground" element={<Playground />} />
                </Routes>
            </Router>
        </div>
    )
}
