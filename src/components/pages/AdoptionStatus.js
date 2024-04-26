import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdoptionStatus() {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const response = await axios.get('http://localhost:8000/api/get/adoption/requests', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Response:', response.data);
                setAdoptionRequests(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching adoption requests:', error);
                toast.error('Failed to fetch adoption requests');
                setAdoptionRequests([]);
                setLoading(false);
            }
        };

        fetchAdoptionRequests();
    }, []);

    return (
        <>
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-center text-lg text-gray-700 mb-4 font-bold">Adoption Requests</h1>
        {loading ? (
            <p className="text-center text-sm text-gray-700 mb-4 font-bold">Loading...</p>
        ) : (
            <div className="grid grid-cols-3 gap-4">
                {adoptionRequests.length === 0 ? (
                    <p className="text-center col-span-3">No pending requests</p>
                ) : (
                    adoptionRequests.map((request) => (
                        <div key={request._id} className="border border-gray-300 rounded-lg p-4">
                            {request.adoptionRequests && request.adoptionRequests.length > 0 ? (
                                <div className="flex flex-wrap">
                                    {request.adoptionRequests[0].imageUrls.map((url, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:8000/uploads/${url}`}
                                            alt={`Pet Image ${index}`}
                                            className="max-w-full h-48 object-cover rounded-lg m-2"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p>No images available</p>
                            )}
                            <p className={`${getStatusColor(request.status)} font-bold mb-2`}>
                                <strong className="text-black">Status:</strong> {request.status}
                            </p>
                            <p className="text-xs"><strong>ID:</strong> {request._id}</p>
                            <p><strong>Name:</strong> {request.name}</p>
                            <p><strong>Contact Info:</strong> {request.contactInfo}</p>
                            <p><strong>Address:</strong> {request.address}</p>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Admin's Message:</strong> {request.adminMessage}</p>
                        </div>
                    ))
                )}
            </div>
        )}
    </div>
</div>

        </>
    );
}

export default AdoptionStatus;
