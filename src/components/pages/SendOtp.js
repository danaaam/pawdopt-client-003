import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SendOtp() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setIsLoading(true); 
    try {
      const response = await fetch('http://localhost:8000/api/sendotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) { 
        setOtp(data.otp);
        alert('Here is your OTP: ' + data.otp);
        navigate('/submit-otp');
      } else {
        // Handle error case here
        console.error('Error sending OTP:', data.message); 
      }
    } catch (error) {
      console.error('Error sending OTP:', error); 
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-center text-lg text-gray-700 mb-4 font-bold">Reset Password</h2>
      <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
      <button  className="block w-full max-w-xs mx-auto bg-[#6dbb48] hover:bg-[#84dd5a] focus:bg-[#6dbb48] text-white rounded-lg px-3 py-3 font-semibold" 
              onClick={handleSendOtp}
              disabled={isLoading}
      >
         {isLoading ? 'Sending...' : 'Send OTP'}
      </button>
              </div>
              </div>
    </div>
  );
}

export default SendOtp;
