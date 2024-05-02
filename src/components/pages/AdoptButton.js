import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdoptButton.css';

const AdoptButton = ({ imageUrl, petId, onAdoptionSubmitted, verified, petOwnerId }) => {
  const [isAdoptFormVisible, setIsAdoptFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

  const handleAdoptFormVisibility = () => {
    if (verified) {
      setIsAdoptFormVisible(!isAdoptFormVisible);
    } else {
      toast.error('Your account is not verified');
    }
  };

  const handleSubmitAdoptionRequest = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const verified = localStorage.getItem('verified');
      const userId = localStorage.getItem('id'); // Retrieve user ID from local storage

      if (!token) {
        toast.error('You need to log in first, please log in');
        navigate('/signin');
        return;
      }

      if (!verified) {
        toast.error('Your account is not verified');
        return;
      }

      const adoptionData = {
        name,
        address,
        email: '', // Include email in the adoption request data. email is from the user token
        contactInfo,
        message,
        imageUrl,
        adoptionRequests: [petId], // Include the petId in the adoption request data
      };

      const response = await axios.post(
        'http://localhost:8000/api/adoption/request',
        adoptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Successfully submitted a request');
        setIsAdoptFormVisible(false);
        setIsRequestSubmitted(true); // Set the state to true upon successful submission
        if (onAdoptionSubmitted) {
          onAdoptionSubmitted(); // Call the callback function if provided
        }
      } else {
        console.error('Error submitting adoption request:', response.data.error);
      }
    } catch (error) {
      console.error('Error submitting adoption request:', error);
      toast.error('Failed to submit adoption request. Please try again.');
    }
  };

  const isCurrentUserNotOwner = () => {
    const userId = localStorage.getItem('id'); // Retrieve user ID from local storage
    return userId !== petOwnerId;
  };

  return (
    <div className="adoption-form">
      {isCurrentUserNotOwner() && (
        <button
          className={`adopt-button ${verified ? '' : 'disabled'}`}
          onClick={handleAdoptFormVisibility}
          disabled={!verified} // Disable button if not verified
        >
          {verified ? 'Adopt Request' : 'Disabled'}
        </button>
      )}
      {isAdoptFormVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="form-title">Adoption Form</h2>
            <form onSubmit={handleSubmitAdoptionRequest}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactInfo">Contact Info:</label>
                <input
                  type="text"
                  id="contactInfo"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  placeholder="Optional"
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                />
              </div>
              <div className="button-group">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleAdoptFormVisibility}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptButton;
