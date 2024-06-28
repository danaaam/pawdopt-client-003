import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdoptionStatus() {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Define the fetchAdoptionRequests function
    const fetchAdoptionRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('id');
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
            setAdoptionRequests([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Call fetchAdoptionRequests when the component mounts
        fetchAdoptionRequests();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

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

    const handleCancelRequest = async (id) => {
        const token = localStorage.getItem('token');
        const confirmCancel = window.confirm('Are you sure you want to cancel this adoption request?');

        if (confirmCancel) {
            try {
                await axios.delete(`http://localhost:8000/api/cancel/adoption/request/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // After successful cancellation, refetch adoption requests
                fetchAdoptionRequests();
                toast.success('Adoption request canceled successfully');
            } catch (error) {
                console.error('Error canceling adoption request:', error);
                toast.error('Failed to cancel adoption request');
            }
        }
    };

    return (
        <center>
            <div className="h-screen max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
                <h1 className="text-center text-lg text-gray-700 mb-4 font-bold">Adoption Requests</h1>
                {loading ? (
                    <p className="text-center text-sm text-gray-700 mb-4 font-bold">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {adoptionRequests.length === 0 ? (
                            <p className="text-center col-span-3">No pending requests</p>
                        ) : (
                            adoptionRequests.map((request) => (
                                <div key={request._id} className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                                    <div className="flex flex-wrap justify-center">
                                        {request.adoptionRequests && request.adoptionRequests.length > 0 ? (
                                            <img
                                                src={`http://localhost:8000/uploads/${request.adoptionRequests[0].imageUrls[0]}`}
                                                alt={`Pet Image`}
                                                className="w-full h-48 object-cover rounded-lg mb-2"
                                            />
                                        ) : (
                                            <p className="text-center mb-2">No images available</p>
                                        )}
                                    </div>
                                    <p className="text-xs text-left"><strong>R#:</strong> <span>{request._id}</span></p>
                                    <p className="text-xs text-left"><strong>Pet#:</strong> <span>{request.adoptionRequests[0]._id}</span></p>
                                    <p className={`${getStatusColor(request.status)} font-bold m-2`}>
                                    {request.status}
                                    </p>
                                    <p className="text-left"><strong className='text-xs'>Name:</strong> {request.name}</p>
                                    <p className="text-left"><strong className='text-xs'>Contact Info:</strong> {request.contactInfo}</p>
                                    <p className="text-left"><strong className='text-xs'>Address:</strong> {request.address}</p>
                                    <p className="text-left"><strong className='text-xs'>Email:</strong> {request.email}</p>
                                    <p className="text-left bg-slate-300 pt-0 pb-1 pl-1 pr-1"><strong className='text-xs'>Admin's Message:</strong><br/> {request.adminMessage || 'Screening/Monitoring Wednesday, July 3 · 9:00 – 10:30am Video call link: https://meet.google.com/bct-nfwx-jsx'}</p>
                                    {request.status === 'pending' && (
                                        <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 float-left"
                                        onClick={() => handleCancelRequest(request._id)}
                                    >
                                        Cancel Request
                                    </button>
                                    
                                    )}
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
