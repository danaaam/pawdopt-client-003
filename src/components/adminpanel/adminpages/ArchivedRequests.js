import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdoptionProcess() {
  const [adoptionrequests, setAdoptionRequests] = useState([]);
  const [adminMessage, setAdminMessage] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get/adoption/requests");
        const filteredRequests = response.data.filter(request => request.status !== "pending");

        // Sort requests by updatedAt in descending order
        filteredRequests.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        setAdoptionRequests(filteredRequests);

        // Initialize admin messages state
        const initialMessages = {};
        filteredRequests.forEach(request => {
          initialMessages[request._id] = request.adminMessage || '';
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

  const handleRestore = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/adoption/request/restore/${id}`,
        { adminMessage: adminMessage[id] },
        { headers: { "Content-Type": "application/json" } }
      );

      // Additional logic...

      toast.warning("Restored");
      window.location.reload();
    } catch (error) {
      console.error("Error updating adoption request:", error);
      toast.error("Failed to update adoption request");
    }
  };

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <p>Loading adoption requests...</p>
      ) : adoptionrequests.length === 0 ? (
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
            {adoptionrequests.map((item) => (
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
                      value={adminMessage[item._id]}
                      onChange={(e) =>
                        setAdminMessage(prevState => ({
                          ...prevState,
                          [item._id]: e.target.value
                        }))
                      }
                      placeholder="Enter message"
                      className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex mt-2">
                      <button
                        onClick={() => handleRestore(item._id)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                      >
                        Restore
                      </button>
                      
                    </div>
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
            {/* Render adoption requests details */}
            {selectedRequest.adoptionRequests.map((request) => (
              <div key={request._id} className="mb-4">
                <p><strong>Request ID:</strong> {selectedRequest._id}</p>
                <p><strong>Pet ID:</strong> {request._id}</p>
                <p><strong>Breed:</strong> {request.breed}</p>
                <p><strong>Species:</strong> {request.species}</p>
                <p><strong>Gender:</strong> {request.gender}</p>
                <p><strong>Age:</strong> {request.age}</p>
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
