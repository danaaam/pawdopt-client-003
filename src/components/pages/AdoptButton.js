import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdoptButton = ({ imageUrl }) => {
  const [isAdoptFormVisible, setIsAdoptFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactinfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdoptFormVisibility = () => {
    setIsAdoptFormVisible(!isAdoptFormVisible);
  };

  const handleSubmitAdoptionRequest = async (event, imageUrl) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const verified = localStorage.getItem('verified');
      if (!token) {
        toast.error("You need to log in first, please log in");
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
        contactinfo,
        message,
        imageUrl: imageUrl, 
      };
  
      const response = await axios.post(
        'http://localhost:8000/api/adoption/request',
        adoptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 201) {
        toast.success("Successfully submitted a request");
      } else {
        console.error("Error submitting adoption request:", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting adoption request:", error);
    }
  };

  return (
    <div className="adoption-form">
      <button onClick={handleAdoptFormVisibility}>Click to adopt</button>
      {isAdoptFormVisible && (
        <div className="adopt-form-overlay">
          <div className="adopt-form">
            <h2>Adoption Form</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  className="form-group-input"
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
                  className="form-group-input"
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
                  className="form-group-input"
                  type="text"
                  id="contactInfo"
                  value={contactinfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <input
                  className="form-group-input"
                  type="text"
                  id="message"
                  value={message}
                  placeholder="Optional"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button onClick={handleSubmitAdoptionRequest}>Submit</button>
              <button onClick={handleAdoptFormVisibility}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptButton;
