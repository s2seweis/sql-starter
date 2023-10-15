import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import React, {useEffect, useState, useContext, createContext} from 'react';

import PostRequest from './components/PostRequest';
import Home from './components/Home';


function App () {
  return (
    <div className="App">

      <Routes>

        <Route path="/post-request" element={<PostRequest/>} />
        <Route path="/" element={<Home/>} />

      </Routes>

      {/* <PostRequest /> */}

    </div>
  );
}

export default App;
