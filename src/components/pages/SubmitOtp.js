import React, { useState } from 'react';

function SubmitOtp() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const validatePassword = () => {
    const hasSpecialChar = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLength = password.length >= 8;

    return {
      hasSpecialChar,
      hasNumber,
      hasLowercase,
      hasUppercase,
      hasLength,
    };
  };


  const getPasswordValidationIcon = (isValid) => {
    return isValid ? (
      <span className="text-green-500">&#10003;</span>
    ) : (
      <span className="text-red-500">&#10060;</span>
    );
  };

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const handleSubmitOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/submitotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) { // Check if the response was successful (status code 2xx)
        // Display alert and navigate to login
        window.alert('Successfully changed password');
        window.location.href = '/login';
      } else {
        // Handle error case here
        console.error('Error submitting OTP:', data.message); // Assuming your backend sends a message property
      }
    } catch (error) {
      console.error('Error submitting OTP:', error);
    }
  };
  

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="font-bold text-3xl text-gray-900">Update Password</h2>
      <div className="flex -mx-3 relative mb-12">
      <div className="w-full px-3">
        <label htmlFor className="text-xs font-semibold px-1">
          Enter Your OTP
        </label>
        <div className="flex relative">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
          </div>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
      />
       </div>
      </div>
      </div>
       <div className="flex -mx-3 relative mb-12">
                  <div className="w-full px-3">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex relative">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="password"
                        placeholder="Enter Your New Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                      {isPasswordFocused && (
                        <div className="absolute top-full left-0 mt-1 p-1.5 bg-white border border-gray-300 rounded shadow-md z-10">
                          {/* Password Validation Icons */}
                          {getPasswordValidationIcon(
                            validatePassword().hasSpecialChar
                          )}{" "}
                          Special Character <br />
                          {getPasswordValidationIcon(validatePassword().hasNumber)} At
                  least 1 Number<br />
                  {getPasswordValidationIcon(
                    validatePassword().hasLowercase
                  )}{" "}
                  Small Caps<br />
                  {getPasswordValidationIcon(
                    validatePassword().hasUppercase
                  )}{" "}
                  Big Caps<br />
                  {getPasswordValidationIcon(validatePassword().hasLength)} At
                  least 8 Characters

                          
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
      <button  className="block w-full max-w-xs mx-auto bg-[#6dbb48] hover:bg-[#84dd5a] focus:bg-[#6dbb48] text-white rounded-lg px-3 py-3 font-semibold" 
      onClick={handleSubmitOtp}>
        Submit
      </button>
              </div>
              </div>
    </div>
  );
}

export default SubmitOtp;
