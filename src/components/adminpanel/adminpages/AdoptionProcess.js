import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdoptionProcess() {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [adminMessage, setAdminMessage] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get/adoption/requests");
        const filteredRequests = response.data.filter((request) => request.status === "pending");
        setAdoptionRequests(filteredRequests);

        // Initialize admin messages state
        const initialMessages = {};
        filteredRequests.forEach((request) => {
          initialMessages[request._id] = request.adminMessage || "";
        });
        setAdminMessage(initialMessages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
        toast.error('Failed to fetch adoption requests');
        setIsLoading(false);
      }
    };

    fetchAdoptionRequests();
  }, []);

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const handleApprove = async (id) => {
    try {
      // Display admin message in confirmation dialog
      const confirmMessage = adminMessage[id] || "No admin message provided.";
      const confirmApprove = window.confirm(`Are you sure you want to approve?\nAdmin Message: ${confirmMessage}`);
      
      if (confirmApprove) {
        await axios.put(
          `http://localhost:8000/api/adoption/request/approve/${id}`,
          { adminMessage: adminMessage[id] },
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Approved");
        window.location.reload(); // Reload the page after approval
      }
    } catch (error) {
      console.error("Error updating adoption request:", error);
      toast.error("Failed to update adoption request");
    }
  };

  const handleDecline = async (id) => {
    try {
      // Display admin message in confirmation dialog
      const confirmMessage = adminMessage[id] || "No admin message provided.";
      const confirmDecline = window.confirm(`Are you sure you want to decline?\nAdmin Message: ${confirmMessage}`);
      
      if (confirmDecline) {
        await axios.put(
          `http://localhost:8000/api/adoption/request/decline/${id}`,
          { adminMessage: adminMessage[id] },
          { headers: { "Content-Type": "application/json" } }
        );
  
        // Additional logic...
  
        toast.warning("Declined");
        window.location.reload(); // Reload the page after decline
      }
    } catch (error) {
      console.error("Error updating adoption request:", error);
      toast.error("Failed to update adoption request");
    }
  };

  const handleSendMessage = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/adoption/request/edit/${id}`,
        { adminMessage: adminMessage[id] },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="h-screen overflow-x-auto">
      {isLoading ? (
        <p>Loading adoption requests...</p>
      ) : adoptionRequests.length === 0 ? (
        <p>No pending adoption requests.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
              <th>Requests</th> {/* New column for button */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adoptionRequests.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.contactInfo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={adminMessage[item._id] || ""}
                      placeholder="Enter message"
                      maxLength={200} // Set maxLength attribute to enforce limit
                      className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      onChange={(e) => setAdminMessage((prevState) => ({ ...prevState, [item._id]: e.target.value }))}
                    />
                    <div className="flex mt-2">
                      <button
                        onClick={() => handleApprove(item._id)}
                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(item._id)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                    <button
                      onClick={() => handleSendMessage(item._id)}
                      className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                    >
                      Send
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Button to open modal */}
                  <button
                    onClick={() => openModal(item)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    View Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for displaying adoption request details */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md" style={{ width: '500px' }}>
            <h2 className="text-lg font-bold mb-4">Adoption Request Details</h2>
            
            {/* Iterate over each adoption request */}
            {selectedRequest.adoptionRequests.map((request) => (
              <div key={request._id} className="mb-4">
                <p><strong>Request ID:</strong> {selectedRequest._id}</p>
                <p><strong>Pet ID:</strong> {request._id}</p>
                <p><strong>Breed:</strong> {request.breed}</p>
                <p><strong>Species:</strong> {request.species}</p>
                <p><strong>Gender:</strong> {request.gender}</p>
                <p><strong>Age:</strong> {request.age} months old</p>
                <p><strong>Caption:</strong> {request.caption}</p>

                {/* Display images if available */}
                <div className="flex flex-wrap justify-center">
                  {request.imageUrls.length > 0 ? (
                    request.imageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8000/uploads/${imageUrl}`}
                        alt={`Pet Image ${index}`}
                        className={` ${request.imageUrls.length === 1 ? 'size-48' : 'size-24'} object-cover rounded-lg m-2`}
                      />
                    ))
                  ) : (
                    <p className="text-center mb-2">No images available</p>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdoptionProcess;
