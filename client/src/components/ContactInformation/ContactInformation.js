import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactInformation.css';
// import { useNavigate } from 'react-router-dom';

const ContactInformation = (props) => {

    // console.log("line:1", props);

    //   const navigate = useNavigate();

    const [rerenderKey, setRerenderKey] = useState(0); // Key to force re-render

    const navigateToUserProfile = () => {
        setRerenderKey((prevKey) => prevKey + 1); // Increment the key to force re-render
    };

    // console.log("line:1", props.userid);

    const [formData, setFormData] = useState({
        user_id: props.userid,
        email: '',
        phone_number: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    });

    // console.log("line:2", formData);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [contactInfo, setContactInfo] = useState([]);
    // console.log("line3", contactInfo);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await axios.get(`https://express-for-postgre-933b44694c3e.herokuapp.com/contact-information`);
                // console.log("line:3", response);

                if (response.data && response.data.length > 0) {
                    const contact = response.data.find((info) => info.userId === props.userid);
                    // console.log("line:4", contact); // Log the found contact information

                    // Use optional chaining when updating state to ensure it's only updated if contact is defined
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        user_id: contact?.user_id || props.userid,
                        email: contact?.email || '',
                        phone_number: contact?.phoneNumber || '',
                        address_line1: contact?.addressLine1 || '',
                        address_line2: contact?.addressLine2 || '',
                        city: contact?.city || '',
                        state: contact?.state || '',
                        postal_code: contact?.postalCode || '',
                        country: contact?.country || '',
                    }));

                    setContactInfo(contact ? [contact] : []);
                } else {
                    // No contact information available, set user_id in formData to props.userid
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        user_id: props.userid,
                    }));
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching contact information:', error);
                setIsLoading(false);
                setErrorMessage('Failed to fetch contact information.');
            }
        };

        // Fetch contact information when props.userid changes
        fetchContactInfo();
    }, [props.userid, rerenderKey]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const addContactInfo = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            console.error('Email is required.');
            return;
        }

        const data = {
            user_id: formData.user_id,
            email: formData.email,
            phone_number: formData.phone_number,
            address_line1: formData.address_line1,
            address_line2: formData.address_line2,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postal_code,
            country: formData.country,
        };

        // console.log("line:5", data);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('https://express-for-postgre-933b44694c3e.herokuapp.com/contact-information', data, config);

            if (res.data.status === 401 || !res.data) {
                console.log('API error, updating dummy data...');
                setErrorMessage('Failed to add contact information via API. Dummy data updated.');
            } else {
                console.log('Success!');
                setSuccessMessage('Contact information added successfully via API.');
                navigateToUserProfile();
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to add contact information via API. ');
        }
    };

    const updateContactInfo = async (e, userId) => {
        e.preventDefault();
        // console.log("line:905", userId);
    
        if (!formData.email) {
            console.error('Email is required.');
            return;
        }
    
        const data = {
            user_id: formData.user_id,
            email: formData.email,
            phone_number: formData.phone_number || null, // Ensure phone_number is not undefined
            address_line1: formData.address_line1 || null,
            address_line2: formData.address_line2 || null,
            city: formData.city || null,
            state: formData.state || null,
            postal_code: formData.postal_code || null,
            country: formData.country || null,
        };
    
        // console.log("line:901", data);
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        // console.log("line:906", userId);
    
        try {
            const res = await axios.put(`https://express-for-postgre-933b44694c3e.herokuapp.com/contact-information/${userId}`, data, config);
            // console.log("line555", res);
        
            if (res.status === 200 && res.data) {
                console.log('Success!');
                setSuccessMessage('Contact information updated successfully via API.');
            } else {
                console.log('API error, updating dummy data...');
                setErrorMessage('Failed to update contact information via API. Dummy data updated.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to update contact information via API.');
        }
    };

    const contactInfoExists = contactInfo.length > 0;

    return (
        <div className="post-request-container">
            <h2 className="users-heading">Add Contact Information</h2>
            <form className="form-post" onSubmit={addContactInfo}>
                <div className="form-group">
                    <label htmlFor="user_id">User ID:</label>
                    <input
                        type="text"
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleInputChange}
                        placeholder="Enter user ID"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address_line1">Address Line 1:</label>
                    <input
                        type="text"
                        id="address_line1"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={handleInputChange}
                        placeholder="Enter address line 1"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address_line2">Address Line 2:</label>
                    <input
                        type="text"
                        id="address_line2"
                        name="address_line2"
                        value={formData.address_line2}
                        onChange={handleInputChange}
                        placeholder="Enter address line 2"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postal_code">Postal Code:</label>
                    <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        placeholder="Enter postal code"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Enter country"
                    />
                </div>
                {/* <button type="submit">
                    {contactInfoExists ? 'Update' : 'Add Contact Informations'}
                </button> */}

                {contactInfoExists ? (
                    // If contact information exists, do not render the button
                    null
                ) : (
                    // If contact information doesn't exist, render the button
                    <button type="submit">
                        {'Add Contact Informations'}
                    </button>
                )}

                {contactInfoExists && (
                    <button type="button" onClick={(e) => updateContactInfo(e, formData.user_id)}>
                        Update
                    </button>
                )}
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="contact-info-container">
                <h3>Contact Information:</h3>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="contact-info-list">
                        {contactInfo.map((contact) => (
                            <div key={contact.contact_id} className="contact-card">
                                <p>Email: {contact.email}</p>
                                <p>Phone Number: {contact.phoneNumber}</p>
                                <p>Address Line 1: {contact.addressLine1}</p>
                                <p>Address Line 2: {contact.addressLine2}</p>
                                <p>City: {contact.city}</p>
                                <p>State: {contact.state}</p>
                                <p>Postal Code: {contact.postalCode}</p>
                                <p>Country: {contact.country}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactInformation;
