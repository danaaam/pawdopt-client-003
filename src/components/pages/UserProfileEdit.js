// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';

// function UserProfileEdit() {
//   const [userData, setUserData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     contactinfo: "",
//     address: ""
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const id = localStorage.getItem('id');
//         const response = await axios.get(`http://localhost:8000/api/getuser/${id}`);
//         setUserData(response.data);
//       } catch (error) {
//         setError('Failed to fetch user profile.');
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (field) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const id = localStorage.getItem('id');
//       const response = await axios.put(`http://localhost:8000/api/edit/user/${id}`, { [field]: userData[field] });

//       if (response.status === 200) {
//         toast.success(`Successfully updated ${field}`);
//         navigate('/valid');
//       } else {
//         setError(`Failed to update ${field}: Unexpected response from server`);
//         toast.error(`Error updating ${field}`);
//       }
//     } catch (error) {
//       console.error(`Error updating ${field}:`, error);
//       setError(error.message);
//       toast.error(`Error updating ${field}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
//       <h2 className="text-center text-2xl text-gray-700 mb-8 font-bold">Edit Profile</h2>
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
//         <form>
//           {/* First Name */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               name="firstname"
//               value={userData.firstname}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             <button
//               type="button"
//               onClick={() => handleSubmit('firstname')}
//               disabled={isLoading}
//               className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               {isLoading ? 'Saving...' : 'Save First Name'}
//             </button>
//           </div>

//           {/* Last Name */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               name="lastname"
//               value={userData.lastname}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             <button
//               type="button"
//               onClick={() => handleSubmit('lastname')}
//               disabled={isLoading}
//               className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               {isLoading ? 'Saving...' : 'Save Last Name'}
//             </button>
//           </div>

//           {/* Email */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             <button
//               type="button"
//               onClick={() => handleSubmit('email')}
//               disabled={isLoading}
//               className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               {isLoading ? 'Saving...' : 'Save Email'}
//             </button>
//           </div>

//           {/* Contact Number */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Contact Number
//             </label>
//             <input
//               type="text"
//               name="contactinfo"
//               value={userData.contactinfo}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             <button
//               type="button"
//               onClick={() => handleSubmit('contactinfo')}
//               disabled={isLoading}
//               className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               {isLoading ? 'Saving...' : 'Save Contact Number'}
//             </button>
//           </div>

//           {/* Address */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={userData.address}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             <button
//               type="button"
//               onClick={() => handleSubmit('address')}
//               disabled={isLoading}
//               className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               {isLoading ? 'Saving...' : 'Save Address'}
//             </button>
//           </div>

//           {error && <div className="text-red-500">{error}</div>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UserProfileEdit;
