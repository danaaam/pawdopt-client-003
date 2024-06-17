import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function Validity() {
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [adminMessage, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editValues, setEditValues] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    suffix: ''
  });
  const [file, setFile] = useState(null);

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
      setError('Failed to fetch verification status.');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:8000/api/getuser/${id}`);
      setUser(response.data);
      setEditValues({
        firstname: response.data.firstname,
        middlename: response.data.middlename,
        lastname: response.data.lastname,
        suffix: response.data.suffix
      });
    } catch (error) {
      setError('Failed to fetch user profile.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/delete/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(null);
      localStorage.clear();
      toast.success("Successfully deleted account");
      navigate('/signup');
    } catch (error) {
      setError('Error deleting account.');
      toast.error("Error Deleting Account");
    }
  };

  const handleEdit = (field) => {
    setEditField(field);
    if (field === 'name') {
      setEditValues({
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        suffix: user.suffix
      });
    } else {
      setEditValue(user[field]);
    }
  };

  const handleSave = async (field) => {
    try {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      let updatedField = {};
      const formData = new FormData();
      
      if (field === 'name') {
        updatedField = editValues;
      } else if (field === 'validDocs' && file) {
        formData.append('validDocs', file);
      } else {
        updatedField[field] = editValue;
      }
      
      if (field === 'validDocs' && file) {
        await axios.put(`http://localhost:8000/api/edit/user/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.put(`http://localhost:8000/api/edit/user/${id}`, updatedField, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      setUser(prevState => ({
        ...prevState,
        ...updatedField
      }));
      setEditField(null);
      toast.success(`Successfully updated ${field}`);
    } catch (error) {
      setError(`Error updating ${field}`);
      toast.error(`Error updating ${field}`);
    }
  };

  useEffect(() => {
    fetchVerificationStatus();
    fetchUserProfile();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openViewImageModal = () => {
    setViewImageModal(true);
  };

  const closeViewImageModal = () => {
    setViewImageModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Account Verification Status</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {verified !== null ? (
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-4">
              {verified ? (
                <>
                  Your account is verified. You can now be a Fur Parent.
                  {adminMessage && <span> {adminMessage}</span>}
                </>
              ) : (
                <>
                  Your account is not verified.
                  {adminMessage && <span> {adminMessage}</span>}
                </>
              )}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-700 mb-4">Loading...</p>
        )}

        {user && (
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">User Profile</h3>

            {/* User Profile Information */}
            <div className="mb-2 flex items-center justify-between">
              <span className="w-1/4 text-left">Name: </span>
              <div className="w-2/4">
                {editField === 'name' ? (
                  <>
                    <input
                      type="text"
                      value={editValues.firstname}
                      onChange={(e) => setEditValues(prev => ({ ...prev, firstname: e.target.value }))}
                      placeholder="First Name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                      type="text"
                      value={editValues.middlename}
                      onChange={(e) => setEditValues(prev => ({ ...prev, middlename: e.target.value }))}
                      placeholder="Middle Name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                      type="text"
                      value={editValues.lastname}
                      onChange={(e) => setEditValues(prev => ({ ...prev, lastname: e.target.value }))}
                      placeholder="Last Name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <input
                      type="text"
                      value={editValues.suffix}
                      onChange={(e) => setEditValues(prev => ({ ...prev, suffix: e.target.value }))}
                      placeholder="Suffix"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                  </>
                ) : (
                  <span>{user.firstname} {user.middlename} {user.lastname} {user.suffix}</span>
                )}
              </div>
              <div className="w-1/4 text-right">
                {editField === 'name' ? (
                  <button
                    onClick={() => handleSave('name')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit('name')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <span className="w-1/4 text-left">Email: </span>
              <div className="w-2/4">
                {editField === 'email' ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>
              <div className="w-1/4 text-right">
                {editField === 'email' ? (
                  <button
                    onClick={() => handleSave('email')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    disabled
                    onClick={() => handleEdit('email')}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${verified !== null ? 'cursor-not-allowed' : ''}`}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <span className="w-1/4 text-left">Contact Number: </span>
              <div className="w-2/4">
                {editField === 'contactinfo' ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <span>{user.contactinfo}</span>
                )}
              </div>
              <div className="w-1/4 text-right">
                {editField === 'contactinfo' ? (
                  <button
                    onClick={() => handleSave('contactinfo')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit('contactinfo')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between text-left">
              <span className="w-1/4">Permanent Address: </span>
              <div className="w-2/4">
                {editField === 'permanentAddress' ? (
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={editValue.split('\n').length}
                  />
                ) : (
                  <span>{user.permanentAddress}</span>
                )}
              </div>
              <div className="w-1/6 text-right">
                {editField === 'permanentAddress' ? (
                  <button
                    onClick={() => handleSave('permanentAddress')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    disabled={verified !== null}
                    onClick={() => handleEdit('permanentAddress')}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${verified !== null ? 'cursor-not-allowed' : ''}`}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between text-left">
              <span className="w-1/4">Current Address: </span>
              <div className="w-2/4">
                {editField === 'currentAddress' ? (
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={editValue.split('\n').length > 3 ? editValue.split('\n').length : 3}
                  />
                ) : (
                  <span>{user.currentAddress}</span>
                )}
              </div>
              <div className="w-1/6 text-right">
                {editField === 'currentAddress' ? (
                  <button
                    onClick={() => handleSave('currentAddress')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit('currentAddress')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Document Section */}
            <div className="mb-2 flex items-center justify-between">
              <span className="w-1/4 text-left">Valid Document: </span>
              <div className="w-2/4">
                {editField === 'validDocs' ? (
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <button
                    onClick={openViewImageModal}
                    className="bg-lime-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    View Document
                  </button>
                )}
              </div>
              <div className="w-1/4 text-right">
                {editField === 'validDocs' ? (
                  <button
                    onClick={() => handleSave('validDocs')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit('validDocs')}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${verified !== false ? 'cursor-not-allowed' : ''}`}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <span className="w-1/4 text-left">Facebook: </span>
              <div className="w-2/4">
                {editField === 'facebook' ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <a href={user.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    {user.facebook}
                  </a>
                )}
              </div>
              <div className="w-1/4 text-right">
                {editField === 'facebook' ? (
                  <button
                    onClick={() => handleSave('facebook')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit('facebook')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={openModal}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Delete Account Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-sm w-full z-50">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              {verified !== true ? (
                <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
              ) : (
                <p className="mb-4">Account deletion is not permitted after admin verification.</p>
              )}
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${verified == true ? 'cursor-not-allowed opacity-50' : ''}`}
                  onClick={() => {
                    handleDeleteAccount();
                    closeModal();
                  }}
                  disabled = {verified == true}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Image */}
      {viewImageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-sm w-full z-50">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Document Image</h2>
              <Zoom>
                <img
                  alt="Document"
                  src={`http://localhost:8000/${user.validDocs}`}
                  className="w-full h-auto rounded-lg mb-4"
                />
              </Zoom>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeViewImageModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Validity;
