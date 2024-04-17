// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './adminpagescss/ImageApproval.css';

// function ImageApproval() {
//   const [usergalleryData, setuserGalleryData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/pending-images');
//       const pendingImages = response.data.filter(image => !image.approved);
  
//       // Sort pending images by ascending timestamp
//       const sortedImages = pendingImages.sort((a, b) => {
//         const timeA = new Date(a.createdAt).getTime(); // Get time component
//         const timeB = new Date(b.createdAt).getTime(); // Get time component
//         return timeA - timeB; // Sort by time
//       });
  
//       setuserGalleryData(sortedImages);
//     } catch (error) {
//       console.error('Error fetching pending images:', error);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`http://localhost:8000/api/approve-image/${id}`);
//       setuserGalleryData(usergalleryData.filter(image => image._id !== id));
//       alert("Successfully Approved");
//       window.location.reload();
//     } catch (error) {
//       console.error('Error approving image:', error);
//     }
//   };

//   const handleDecline = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to decline this image?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:8000/api/decline-image/${id}`);
//         setuserGalleryData(usergalleryData.filter(image => image._id !== id)); 
//         window.location.reload();
//       } catch (error) {
//         console.error("Error deleting image:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Pending Images</h2>
//       {usergalleryData && usergalleryData.length > 0 ? (
//         usergalleryData.map((group) => (
//           <div key={group._id} className="gallery-group">
//             <p><strong>Posted by:</strong> {group.user_email}</p>
//             {group.images && group.images.length > 0 && (
//               <>
//                 <p><strong>Caption:</strong> {group.images[0].caption}</p>
//                 <p><strong>Species:</strong> {group.images[0].species}</p>
//                 <p><strong>Breed:</strong> {group.images[0].breed}</p>
//                 <p><strong>Gender:</strong> {group.images[0].gender}</p>
//                 <p><strong>Age in months:</strong> {group.images[0].age}</p>
//                 <p><strong>Medical History:</strong> {group.images[0].medhistory} {group.images[0].others}</p>
//                 {group.images.map((item) => (
//                   <div key={item._id} className="gallery-image-container">
//                     <img src={`http://localhost:8000/uploads/${item.imageUrl}`} alt={item.caption} />
//                     <button onClick={() => handleApprove(item._id)}>Approve</button>
//                     <button onClick={() => handleDecline(item._id)}>Decline</button>
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No pending images</p>
//       )}
//     </div>
//   );
  
// }

// export default ImageApproval;
