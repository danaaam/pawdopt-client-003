import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdoptionProcess() {
  const [adoptionrequests, setAdoptionRequests] = useState([]);
  const [adoptionData, setadoptionData] = useState([]);


  const [adminMessage, setAdminMessage]= useState([]);



  const fetchImageData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/pets/for/adoption');
  
      const sortedImages = response.data.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime(); 
        const timeB = new Date(b.createdAt).getTime(); 
        return timeA - timeB; 
      });
  
      setadoptionData(sortedImages);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchImageData();
  }, []);


  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get/adoption/requests"
        );
        setAdoptionRequests(response.data);
        
        // Initialize admin messages state for each adoption request
        const initialAdminMessages = {};
        response.data.forEach(request => {
          initialAdminMessages[request._id] = '';
        });
        setAdminMessage(initialAdminMessages);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };

    fetchAdoptionRequests();
  }, []);

  
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/adoption/request/approve/${id}`,
        { adminMessage: adminMessage[id] }, 
        { headers: { "Content-Type": "application/json" } } 
      );
      toast.success("Approved");
      window.location.reload();
    } catch (error) {
      console.error("Error updating adoption request:", error);
    }
  };
  
  const handleDecline = async (id) => { 
    try {
      await axios.put(
        `http://localhost:8000/api/adoption/request/decline/${id}`,
        { adminMessage: adminMessage[id] }, 
        { headers: { "Content-Type": "application/json" } } 
      );
      toast.warning("Declined");
      window.location.reload();
    } catch (error) {
      console.error("Error updating adoption request:", error);
    }
  };
  
  

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {adoptionrequests && adoptionrequests.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.contactinfo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Action buttons */}
                <div className="flex flex-col items-center">
                  {/* Input field for admin message */}
                  <input
                    type="text"
                    value={adminMessage[item._id]} 
                    onChange={(e) => setAdminMessage(prevState => ({ ...prevState, [item._id]: e.target.value }))} 
                    placeholder="Enter message"
                    className="mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              {adoptionData.map((group) => (
                <div key={group._id} className="gallery-group px-6 py-4 whitespace-nowrap">
                  <div className="information">
                    <p><strong>Posted by:</strong> {group.user_email}</p>
                    <p><strong>Caption:</strong> {group.images[0].caption}</p>
                    <p><strong>Species:</strong> {group.images[0].species}</p>
                    <p><strong>Breed:</strong> {group.images[0].breed}</p>
                    <p><strong>Gender:</strong> {group.images[0].gender}</p>
                    <p><strong>Age in months:</strong> {group.images[0].age}</p>
                    <p><strong>Medical History:</strong> {group.images[0].medhistory} {group.images[0].others}</p>
                  </div>
                  <div className="images-wrapper">
                    {group.images.map((image, index) => (
                      <div key={index} className="gallery-image-container">
                        <img 
                          src={`http://localhost:8000/uploads/${image.imageUrl}`}
                          alt={group.caption}
                          className="h-12 w-12 object-cover rounded-full"/> 
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdoptionProcess;
