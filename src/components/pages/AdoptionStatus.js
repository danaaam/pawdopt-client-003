import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdoptionStatus() {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to determine text color based on adoption status
    const getStatusColor = (status) => {
        const normalizedStatus = status.toLowerCase();
        switch (normalizedStatus) {
            case 'pending':
                return 'text-orange-500';
            case 'approved':
                return 'text-green-500';
            case 'rejected':
                return 'text-red-500';
            default:
                return 'text-gray-700';
        }
    };

    useEffect(() => {
        const fetchAdoptionRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('id'); // Assuming user_id is stored in localStorage
                const response = await axios.get('http://localhost:8000/api/get/adoption/requests', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Filter adoption requests based on user_id
                const filteredRequests = response.data.filter(request => request.user_id === userId);

                setAdoptionRequests(filteredRequests);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching adoption requests:', error);
                toast.error('Failed to fetch adoption requests');
                setAdoptionRequests([]); // Reset adoptionRequests state on error
                setLoading(false);
            }
        };

        fetchAdoptionRequests();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
            <center>
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-center text-lg text-gray-700 mb-4 font-bold">Adoption Requests</h1>
                {loading ? (
                    <p className="text-center text-sm text-gray-700 mb-4 font-bold">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {adoptionRequests.length === 0 ? (
                            <p className="text-center col-span-3">No pending requests</p>
                        ) : (
                            adoptionRequests.map((request) => (
                                <div key={request._id} className="border border-gray-300 rounded-lg p-4">
                                    {request.adoptionRequests && request.adoptionRequests.length > 0 ? (
                                        <div className="flex flex-wrap justify-center">
                                            {/* Display only the first image if available */}
                                            {request.adoptionRequests[0].imageUrls.length > 0 ? (
                                                <img
                                                    src={`http://localhost:8000/uploads/${request.adoptionRequests[0].imageUrls[0]}`}
                                                    alt={`Pet Image`}
                                                    className="max-w-full h-48 object-cover rounded-lg mb-2"
                                                />
                                            ) : (
                                                <p className="text-center mb-2">No images available</p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-center mb-2">No images available</p>
                                    )}
                                    <p className={`${getStatusColor(request.status)} font-bold mb-2`}>
                                       {request.status}
                                    </p>
                                    <p className="text-xs text-left"><strong>ID:</strong> {request._id}</p>
                                    <p className="text-left"><strong>Name:</strong> {request.name}</p>
                                    <p className="text-left"><strong>Contact Info:</strong> {request.contactInfo}</p>
                                    <p className="text-left"><strong>Address:</strong> {request.address}</p>
                                    <p className="text-left"><strong>Email:</strong> {request.email}</p>
                                    <p className="text-left"><strong>Admin's Message:</strong> {request.adminMessage}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </center>
       
    );
}

export default AdoptionStatus;
