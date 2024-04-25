import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdoptButton.css'; // Import your custom CSS file for styling

const AdoptButton = ({ imageUrl, petId }) => {
  const [isAdoptFormVisible, setIsAdoptFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdoptFormVisibility = () => {
    setIsAdoptFormVisible(!isAdoptFormVisible);
  };

  const handleSubmitAdoptionRequest = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const verified = localStorage.getItem('verified');
      if (!token) {
        toast.error('You need to log in first, please log in');
        navigate('/login');
        return;
      }
      if (!verified) {
        toast.error('Not yet verified, Click Ok to see Verification status');
        navigate('/valid');
        return;
      }

      const adoptionData = {
        name,
        address,
        email, // Include email in the adoption request data. email is from the user token
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
            Authorization: `Bearer ${token}`
          },
        }
      );
  
      if (response.status === 201) {
        toast.success('Successfully submitted a request');
        setIsAdoptFormVisible(false); // Close the modal after successful submission
        window.location.reload();
      } else {
        console.error('Error submitting adoption request:', response.data.error);
      }
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }
  };  
  
  return (
    <div className="adoption-form">
      <button className="adopt-button" onClick={handleAdoptFormVisibility}>
        Adopt Request
      </button>
      {isAdoptFormVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adoption Form</h2>
            <form onSubmit={handleSubmitAdoptionRequest}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  placeholder="Optional"
                  onChange={(e) => setMessage(e.target.value)}
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
