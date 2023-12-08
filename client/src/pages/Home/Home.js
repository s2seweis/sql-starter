/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ComponentSelector from '../../components/ComponentSelector/ComponentSelector';

const Home = () => {

    return (
        <div style={{ margin: "15px" }} className="home-container">
            <h1>Welcome to My React App with Postgre</h1>
            <p>Sending Reuests to the Server and querry for the data in the Postgre database.</p>

            <ComponentSelector />

        </div>
    );
};

export default Home;