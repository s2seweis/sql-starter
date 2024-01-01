// CheckoutForm.js
import React, { useState } from 'react';
import './Checkout.css';

const CheckoutForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    paymentMethod: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <h2>Step 1: Personal Information</h2>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className="step">
            <h2>Step 2: Shipping Address</h2>
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div className="step">
            <h2>Step 3: Payment</h2>
            <label>Payment Method:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
            <button onClick={prevStep}>Previous</button>
            <button onClick={submitForm}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  const submitForm = () => {
    // Implement logic to submit form data
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {renderStep()}
    </div>
  );
};

export default CheckoutForm;
