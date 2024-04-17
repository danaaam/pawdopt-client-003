import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Validity() {
  const [verified, setVerified] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [adminMessage, setMessage] = useState("");

  const navigate = useNavigate();

  const fetchVerificationStatus = async () => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/check-verification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setVerified(response.data.verified);
      setMessage(response.data.adminMessage);
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:8000/api/getuser/${id}`);
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const id = localStorage.getItem('id');
      const confirmDelete = window.confirm('Are you sure you want to delete your account? This can`t undo. Click Ok to proceed');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/delete/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("verified");
        window.localStorage.removeItem("isLoggedin"); 
        toast.success("Successfully deleted account");
        navigate('/sign-up')
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error Deleting Account")

    }
  };

  useEffect(() => {
    fetchVerificationStatus();
    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile'); 
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-center text-lg text-gray-700 mb-4 font-bold">Account Verification Status</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      {verified !== null ? (
        <div className="text-center">
          {verified ? (
            <p className="text-sm text-gray-700">
              Your account is verified. You can now be a Fur Parent. {adminMessage}
            </p>
          ) : (
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Your account is not verified. {adminMessage}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-700 mb-4">Loading...</p>
      )}

  {user && (
    <div className="text-center">
      <h2 className="text-lg text-gray-700 mb-2 font-bold">User Profile</h2>
      <p className="mb-1">Email: {user.email}</p>
      <p className="mb-1">Name: {user.firstname} {user.lastname}</p>
      <p className="mb-1">Contact Number: {user.contactinfo}</p>
      <p className="mb-1">Address: {user.address}</p>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleDeleteAccount}>Delete Account</button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditProfile}>Edit Profile</button>
    </div>
  )}
</div>
  );
}

export default Validity;
