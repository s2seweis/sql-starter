import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playground.css';

const GetCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/cars'); // Assuming your API is hosted at '/api'
        // for fix the error with the proxi, use an other node version then 18
        setCars(response.data);
      } catch (error) {
        console.error('Error getting cars:', error.message);
        // Handle error, show a message to the user, etc.
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>Cars List</h1>
      <div>
        {cars.map((car) => (
          <div className='card-container' key={car.id}>

            <strong>Model:</strong> {car.bio} <br />
            <strong>Username:</strong> {car.username} <br />
            <strong>Bio:</strong> {car.bio} <br />
            <strong>Created At:</strong> {car.createdAt} <br />
            <strong>Updated At:</strong> {car.updatedAt}

          </div> // Assuming 'model' is a property of each car
        ))}
      </div>
    </div>
  );
};

export default GetCars;
