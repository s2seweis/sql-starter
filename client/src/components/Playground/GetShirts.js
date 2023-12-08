import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playground.css';

const GetShirts = () => {
  const [shirts, setShirts] = useState([]);
  console.log("line:100", shirts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/shirts'); // Assuming your API is hosted at '/api'
        // for fix the error with the proxi, use an other node version then 18
        setShirts(response.data);
      } catch (error) {
        console.error('Error getting shirts:', error.message);
        // Handle error, show a message to the user, etc.
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>Cars List</h1>
      <div>
        {shirts.map((shirt) => (
          <div className='card-container' key={shirt.id}>

            <strong>Title</strong> {shirt.title} <br />
            <strong>Brand:</strong> {shirt.brand} <br />
            <strong>Des:</strong> {shirt.des} <br />
            <strong>Created At:</strong> {shirt.createdAt} <br />
            <strong>Updated At:</strong> {shirt.updatedAt}

          </div> // Assuming 'model' is a property of each shirt
        ))}
      </div>
    </div>
  );
};

export default GetShirts;
