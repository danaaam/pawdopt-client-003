import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);


   const navigate = useNavigate();


  const requestVerificationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/send-verification-email', { email });
      setMessage(response.data.message);
      if (response.status === 200) {
        setShowCodeInput(true);
      }
    } catch (error) {
      setMessage('Error requesting verification code.');
    }
  };


const verifyEmail = async (verificationCode, email) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/verify-email`, {
      params: { code: verificationCode, email: email.toLowerCase() } // Ensure case-insensitive match
    });
    setMessage(response.data.message);
    if (response.status === 200) {
       navigate('/check-verification-email');
    } else {
     
      setMessage(response.data.error);
    }
  } catch (error) {
    console.error(error);
    setMessage(error.response ? error.response.data.error : 'An error occurred during email verification.');
  }
};






  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.trim() === '') {
      setMessage('Please enter the verification code.');
      return;
    }
    try {
      await verifyEmail(code, email);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Error verifying email.');
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Email Verification</h2>


        {/* Email Request Form */}
        {(!showCodeInput || message.includes('successfully')) && (
          <form onSubmit={requestVerificationCode} className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Send Code
                </button>
              </div>
            </div>
            {message && <p className="text-center text-gray-700 mt-4">{message}</p>}
          </form>
        )}


        {/* Verification Code Entry Form */}
        {showCodeInput && (
          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                Verification Code
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="code"
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Confirm
                </button>
              </div>
            </div>
            {message && <p className="text-center text-gray-700 mt-4">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};


export default VerifyEmail;
