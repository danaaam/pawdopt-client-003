import React, { useState } from "react";
import axios from "axios";
import { FaPaw } from "react-icons/fa";

function ForgotPasswordNewPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/newpassword", {
        token,
        newPassword,
      });
      alert("Password reset successfully");
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
          New Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Enter your token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
      </div>
    </div>
  );
}

export default ForgotPasswordNewPassword;
