import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa"; // Import email icon
import Modal from "./Modal"; // Ensure you have the Modal component
import "./adminpagescss/Users.css";


function Users() {
  const [users, setUsers] = useState([]);
  const [viewingUser, setViewingUser] = useState(null);
  const [adminMessage, setAdminMessage] = useState(""); // Add this state if needed
  const roles = ["admin", "user"]; // Example roles


  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };


  const handleViewMore = (user) => {
    setViewingUser(user);
  };


  const closeModal = () => {
    setViewingUser(null);
  };


  const handleToggleVerification = async (user, value) => {
    const updatedUser = { ...user, verified: value, adminMessage: adminMessage };
    try {
      console.log(`Toggling verification for user ${user._id} to ${value}`);
      const response = await axios.put(
        `http://localhost:8000/api/toggle-verification/${user._id}`,
        updatedUser
      );
      console.log("Server response:", response.data);
      if (response.status === 200) {
        fetchUsers();
        toast.success("User verification status updated successfully!");
      } else {
        toast.error("Failed to update verification status.");
      }
    } catch (error) {
      console.error("Error toggling user verification:", error);
      toast.error("Failed to update verification status.");
    }
  };


  const handleRoleChange = async (userId, newRole) => {
    try {
      console.log(`Updating user ${userId} role to ${newRole}`);
      const response = await axios.patch(`http://localhost:8000/api/edit/users/${userId}`, { role: newRole });
      console.log("Server response:", response.data);


      if (response.status === 200) {
        fetchUsers();
        toast.success("User role updated successfully!");
      } else {
        toast.error("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role.");
    }
  };


  const handleSendEmail = (email) => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}`);
  };


  return (
    <div className="h-screen overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email:
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email Verified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Firstname
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lastname
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
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isVerified ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastname}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border border-gray-300 rounded-md"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.verified.toString()}
                  onChange={(e) => {
                    const newVerified = e.target.value === "true";
                    handleToggleVerification(user, newVerified);
                  }}
                  className="border border-gray-300 rounded-md"
                >
                  <option value="true">Verify</option>
                  <option value="false">Unverify</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                <button
                  onClick={() => handleViewMore(user)}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  View More
                </button>
                <FaEnvelope
                  className="email-icon"
                  onClick={() => handleSendEmail(user.email)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {viewingUser && (
        <Modal show={!!viewingUser} onClose={closeModal} user={viewingUser} fetchUsers={fetchUsers} />
      )}
    </div>
  );
}


export default Users;
