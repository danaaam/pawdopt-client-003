import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdoptionStatus() {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchAdoptionRequests();
    }, []);
  
    const fetchAdoptionRequests = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/get/adoption/request/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            setAdoptionRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching adoption requests:', error);
            setAdoptionRequests([]);
            setLoading(false);
        }
    };
      
  
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-center text-lg text-gray-700 mb-4 font-bold">Adoption Status</h1>
            {loading ? (
                <p className="text-center text-sm text-gray-700 mb-4 font-bold">Loading...</p>
            ) : (
                <ul className="text-center text-sm text-gray-700 mb-4 font-bold">
                    {adoptionRequests.length === 0 ? (
                        <p>No pending request</p>
                    ) : (
                        adoptionRequests.map((request) => (
                            <div key={request._id} style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
                                <p><strong>Status:</strong> {request.status}</p>
                                <p><strong>Name:</strong> {request.name}</p>
                                <p><strong>Contact Info:</strong> {request.contactinfo}</p>
                                <p><strong>Address:</strong> {request.address}</p>
                                <p><strong>Email:</strong> {request.email}</p>
                                <p><strong>Pet's image:</strong> {request.imageUrl}</p>
                                <p><strong>Admin's Message:</strong>{request.adminMessage}</p>
                            </div>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default AdoptionStatus;
