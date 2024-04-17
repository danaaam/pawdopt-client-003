import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminpagescss/Users.css";
import { toast } from "react-toastify";

function Users() {


  const [adminMessage, setAdminMessage] = useState('');
  
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    _id: null,
    firstname: "",
    lastname: "",
    email: "",
    contactinfo: "",
    address: "",
    password: "",
    verified: false,
    role: "",
  });

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditUser = (user) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/edit/users/${editedUser._id}`,
        editedUser
      );
      setEditingUserId(null);
      setEditedUser({
        _id: null,
        firstname: "",
        lastname: "",
        email: "",
        contactinfo: "",
        address: "",
        password: "",
        verified: false,
        role: "",
        admimMessage: ""
      });
      fetchUsers();
      // Alert message when edit is successful
      toast.success("User saved successfully!");
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
  const handleCancelEdit = () => {
    window.location.reload();
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/users/${id}`);
      fetchUsers(); // Refresh users data after deleting
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleToggleVerification = async (user, value) => {
    const updatedUser = { ...user, verified: value, adminMessage: adminMessage };
    try {
      await axios.put(
        `http://localhost:8000/api/toggle-verification/${user._id}`,
        updatedUser
      );
      fetchUsers();
      toast.success("Changes saved");
      window.location.reload(); 
    } catch (error) {
      console.error("Error toggling user verification:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Firstname
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lastname
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Verified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="firstname"
                    value={editedUser.firstname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                ) : (
                  <span>{user.firstname}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="lastname"
                    value={editedUser.lastname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                ) : (
                  <span>{user.lastname}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="contactinfo"
                    value={editedUser.contactinfo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                ) : (
                  <span>{user.contactinfo}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="address"
                    value={editedUser.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                ) : (
                  <span>{user.address}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingUserId === user._id ? (
                  <select
                    name="role"
                    value={editedUser.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    {/* Add more options as needed */}
                  </select>
                ) : (
                  <span>{user.role}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <div className="flex items-center">
                      <select
                        value={user.verified ? "true" : "false"}
                        onChange={(e) => handleToggleVerification(user, e.target.value === "true", e.target.nextElementSibling.value)}
                        className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                      >
                        <option value="false">Unverify</option>
                        <option value="true">Verify</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Enter message"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                      />
                    </div>
                  ) : (
                    <span>{user.verified ? "Verified" : "Not Verified"}</span>
                  )}
                </td>
              <td className="px-6 py-4 whitespace-nowrap">
              {editingUserId === user._id ? (
              <div>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2 mb-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-2 mb-2"
              >
                Cancel
              </button>
            </div>
             ) : (
            <div className="flex flex-col">
              <button
                onClick={() => handleEditUser(user)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 mr-2 mb-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-2 mb-2"
              >
                Delete
              </button>
            </div>
          )}
        </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
