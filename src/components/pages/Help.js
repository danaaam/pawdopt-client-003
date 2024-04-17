// import React, { useState } from 'react';
// import bgdonate from '../assets/bg-donate-main.png'
// import bgdonateitem from '../assets/bg-donate-item.png'
// import bgvolunteer from '../assets/bg-volunteer.png'
// import {BsPaypal, BsBank} from 'react-icons/bs'
// import {TbSquareRoundedLetterG ,TbSquareLetterM} from 'react-icons/tb'
// import './pagescss/Help.css'

// function Help () {
//   const [volunteerInfo, setVolunteerInfo] = useState({
//     name: '',
//     contact: '',
//     location: '',
//     availability: '',
//     skills: '',
//     message: '',
//   });
//   const [status, setStatus] = useState(null);

//   const fetchVolunteerForms = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/volunteer-forms-get');

//       if (!response.ok) {
//         throw new Error(`Failed to fetch volunteer forms. Server responded with status: ${response.status}`);
//       }

//       // Do something with the response if needed

//     } catch (error) {
//       console.error('Error fetching volunteer forms:', error.message);
//     }
//   };
  
  

//   const handleVolunteerSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8000/api/volunteer-forms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(volunteerInfo),
//       });

//       const data = await response.json();

//       if (data.message === 'Volunteer form submitted successfully') {
//         setStatus('pending'); // Set the initial status to 'pending'
//        alert('Volunteer form submitted successfully! Wait for the response of the admin');

//         // Trigger a refetch of volunteer forms on the admin side
//         fetchVolunteerForms();
//       } else {
//         setStatus('error');
//       }
//     } catch (error) {
//       console.error('Error submitting volunteer form:', error);
//       setStatus('error');
//     }
//   };
  

//   return (
//     <div className="help-us-page"> 
//     <div className="text-section-volunteer">
//     <h3>
//         Thank you for your interest in volunteering! We appreciate your willingness to help our cause.
//         Please fill out the form below to get started.
//       </h3>
//         <p>Join our pet adoption community as a volunteer and make a difference in pet's lives.</p>
//       <div className="volunteer-section">
//         <div className="voluteer-form ">
//         <img src={bgvolunteer} alt='' width="50%" height="200px"/>
//         <h2>Become a Volunteer</h2>
//         {status && <p>Status: {status}</p>}
//         <form onSubmit={handleVolunteerSubmit}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={volunteerInfo.name}
//             onChange={(e) => setVolunteerInfo({ ...volunteerInfo, name: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Contact Information"
//             value={volunteerInfo.contact}
//             onChange={(e) => setVolunteerInfo({ ...volunteerInfo, contact: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={volunteerInfo.location}
//             onChange={(e) => setVolunteerInfo({ ...volunteerInfo, location: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Availability"
//             value={volunteerInfo.availability}
//             onChange={(e) => setVolunteerInfo({ ...volunteerInfo, availability: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Skills or Experience"
//             value={volunteerInfo.skills}
//             onChange={(e) => setVolunteerInfo({ ...volunteerInfo, skills: e.target.value })}
//             required
//           />
//           <textarea
//             placeholder="Message (optional)"
//             value={volunteerInfo.message}
//             onChange={(e) => setVolunteerInfo({ ...volunteerInfo, message: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         </div>
//         </div>
//         </div>
//         <div className="donation-section">
//         <img src={bgdonate} alt='' width="80%" height="300"/>
//         <h2>Donation</h2>
//         <p>
//           Your generous donations help support our mission. You can make a contribution through the following e-wallet:
//         </p>
//         <p><TbSquareRoundedLetterG className="icon-help"/>Gcash number: <strong>09090909090</strong></p>
//         <p><TbSquareLetterM className="icon-help"/>Maya number: <strong>09090909090</strong></p>
//         <p><BsPaypal className="icon-help"/>Paypal number: <strong>09090909090</strong></p>
//         <p><BsBank className="icon-help"/>Bank number: <strong>1234 5678 9012 3456</strong></p>
//         </div>
//       <div className="donation">
//         <div className="donation-item">
//         <img src={bgdonateitem} alt=''/>
//         </div>
//         <div className="donation-paragraph">
//       <p>Pet Food</p>
//       <p>Pet Supplies</p>
//       <p>Bedding and Blankets</p>
//       <p>Crates and Carriers</p>
//       <p>Grooming Supplies</p>
//       <p>Cleaning Supplies</p>
//       <p>Litter and Litter Boxes</p>
//       <p>Medical Supplies</p>
//       <p>Flea and Tick Preventatives</p>
//       <p>Medications</p>
//       <p>Enrichment Toys</p>
//       <p>Towels and Washcloths</p>
//       <p>Crate Mats and Beds</p>
//       <p>Collapsible Playpens</p>
//       </div>
//       </div>
//       </div>
//   );
// }

// export default Help ;
