import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function UserProfileEdit() {



  const [firstname, setnewFirstname] = useState("");
  const [lastname, setnewLastname] = useState("");
  const [email, setnewEmail] = useState("");
  const [contactinfo, setnewContactinfo] = useState("");
  const [address, setnewAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()


  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
        const id = localStorage.getItem('id');
        const response = await axios.put(`http://localhost:8000/api/edit/user/${id}`, 
        {firstname, 
        lastname,
        email, 
        address, 
        contactinfo, 
        address});
        
        if (response.status === 200) {
            // Update state with successful response data
            setnewFirstname(response.data.firstname);
            setnewLastname(response.data.lastname);
            setnewEmail(response.data.email);
            setnewContactinfo(response.data.contactinfo);
            setnewAddress(response.data.address);
            toast.success("Succesfully Edited User Information");
            navigate('/valid')
        } else {
            setError("Failed to edit user: Unexpected response from server");
            toast.error("Error editing user");
        }
    } catch (error) {
        console.error('Error editing user:', error);
        setError(error.message);
        toast.error("Error editing user");
    } finally {
        setIsLoading(false);
    }
    
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-center text-lg text-gray-700 mb-4 font-bold">Edit Profile</h2>
      <form className="text-center">
        {/* Input fields for editing user information */}
        <div className="flex -mx-3">
                  {/* First Name */}
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      First name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="fistname"
                        onChange={(e) => setnewFirstname(e.target.value)}
                        value={firstname}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                  {/* Last Name */}
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      Last name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setnewLastname(e.target.value)}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        onChange={(e) => setnewEmail(e.target.value)}
                        value={email}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      Contact Number
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Contact Number"
                        name="contactinfo"
                        onChange={(e) => setnewContactinfo(e.target.value)}
                        value={contactinfo}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      Address
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        onChange={(e) => setnewAddress(e.target.value)}
                        value={address}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
        <button onClick={handleSubmit} disabled={isLoading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}

export default UserProfileEdit;
