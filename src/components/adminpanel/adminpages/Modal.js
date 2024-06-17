import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css'; // Ensure this file exists and contains the necessary styling
import { toast } from "react-toastify";

const Modal = ({ show, onClose, user, fetchUsers }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...user });

  if (!show) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSaveEdit = async (field) => {
    try {
      await axios.patch(`http://localhost:8000/api/edit/users/${user._id}`, { [field]: editedUser[field] });
      fetchUsers();
      setEditMode(null);
      toast.success("User information updated successfully!");
    } catch (error) {
      console.error("Error editing user:", error);
      toast.error("Failed to update user information.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/users/${user._id}`);
      fetchUsers();
      onClose();
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const roleOptions = ["user", "admin"];
  const suffixOptions = ["II", "III", "IV", "Jr.", "Sr."];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>User Details</h2>
        <div className="user-details">
          {Object.keys(user).map((key) => (
            key !== '__v' && key !== '_id' && key !== 'password' && key !== 'validDocs' && key !== 'verified' && (
              <div key={key} className="user-info">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> 
                {editMode === key ? (
                  <>
                    {key === 'role' ? (
                      <select
                        name={key}
                        value={editedUser[key]}
                        onChange={handleInputChange}
                        className="edit-input"
                      >
                        {roleOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : key === 'suffix' ? (
                      <select
                        name={key}
                        value={editedUser[key]}
                        onChange={handleInputChange}
                        className="edit-input"
                      >
                        {suffixOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={editedUser[key]}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    )}
                    <button onClick={() => handleSaveEdit(key)} className="save-button">Save</button>
                  </>
                ) : (
                  <>
                    {key === 'facebook' ? (
                      <a href={user[key]} target="_blank" rel="noopener noreferrer" className="text-left text-blue-500 text-decoration-line: underline;">{user[key]}</a>
                    ) : (
                      <span>{user[key]}</span>
                    )}
                    <button onClick={() => setEditMode(key)} className="edit-button">Edit</button>
                  </>
                )}
              </div>
            )
          ))}
        </div>
        {user.validDocs && (
          <div className="image-container">
            <img src={`http://localhost:8000/${user.validDocs}`} alt="Valid ID" className="valid-id" />
          </div>
        )}
        <button onClick={handleDeleteUser} className="delete-button">Delete</button>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;
