import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CheckVerificationStatus = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const email = localStorage.getItem('email'); // Assuming you store the email in localStorage


    const checkVerificationStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/check/verification/status?email=${email}`);
        setIsVerified(response.data.isVerified);
        setError('');
      } catch (error) {
        setError('Error checking verification status.');
        setIsVerified(false);
      }
    };


    if (email) {
      setEmail(email); // Set the email in state
      checkVerificationStatus();
    }
  }, []);


  const handleVerifyEmail = () => {
    navigate('/verify-email');
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Check Verification Status</h2>
      <div className="mb-4">
        <p className="text-center text-gray-700 mt-4">Email: {email}</p>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        <p className="text-center mt-4">
          {isVerified ? 'Email is verified.' : 'Email is not verified.'}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
  {!isVerified && (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleVerifyEmail}
    >
      Verify Your Email Here
    </button>
  )}
  {isVerified && (
    <p className="text-center text-green-600 font-semibold mt-4">Your email is already verified.</p>
  )}
</div>  
    </div>
  </div>
 
  );
};


export default CheckVerificationStatus;
