import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a unique token
      const token = uuidv4();

      await axios.post("http://localhost:8000/api/forgotpassword", {
        email,
        token,
      });
      alert("Password reset email sent successfully");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto flex items-center justify-center h-10 w-auto mb-6">
          <FaPaw size={35} />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            
            <div className="mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#6dbb48] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#77df47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6dbb48]"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-[#6dbb48] hover:text-[#77df47]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
