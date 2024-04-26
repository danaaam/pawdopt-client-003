import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pagescss/FriendNeedsHome.css";
import { useNavigate } from "react-router-dom";
import TalkToTheUser from "./AdoptButton";
import { toast } from "react-toastify";

function FriendNeedsHome() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [usergalleryData, setuserGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  //uploading field
  const [caption, setCaption] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medhistory, setMedHistory] = useState([]);
  const [species, setSpecies] = useState("");
  const [others, setOthers] = useState("");

  const handleEditCaption = (event) => {
    setCaption(event.target.value);
  };
  const handleEditBreed = (event) => {
    setBreed(event.target.value);
  };
  const handleEditGender = (event) => {
    setGender(event.target.value);
  };
  const handleEditAge = (event) => {
    setAge(event.target.value);
  };
  const handleEditSpecies = (event) => {
    setSpecies(event.target.value);
  };
  const handleEditOthers = (event) => {
    setOthers(event.target.value);
  };
  const handleEditMedHistory = (event) => {
    const { value } = event.target;
    if (medhistory.includes(value)) {
      // If already selected, remove it from the array
      setMedHistory(medhistory.filter((term) => term !== value));
    } else {
      // If not selected, add it to the array
      setMedHistory([...medhistory, value]);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convert to array
    setSelectedImage(selectedFiles);
  };

  useEffect(() => {
    fetchData();
    console.log("useEffect ran")
  });
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/gallery"
      );
  
      console.log("Response Data:", response.data);
  
      const sortedPets = response.data.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA - timeB;
      });
  
      // Log the _id of each image
      sortedPets.forEach((pet) => {
        const petId = pet._id;
        console.log("pet _id:", petId);
      });
  
      setuserGalleryData(
        sortedPets.map((image) => ({ ...image, isAdoptFormVisible: false }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleAddToGallery = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const token = localStorage.getItem("token");
      const verified = localStorage.getItem("verified");

      if (!token) {
        toast.error("You need to log in first, please log in");
        navigate("/login");
        return;
      }
      if (!verified) {
        toast.error("Not yet verified, Click Ok to see Verification status");
        navigate("/valid");
        return;
      }
      if (!selectedImage || !caption || !breed || !gender || !age || medhistory.length === 0) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      selectedImage.forEach((file) => formData.append("images", file));
      formData.append("caption", caption);
      formData.append("breed", breed);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("species", species);
      formData.append("medhistory", medhistory.join(", "));
      formData.append("others", others);

      await axios.post("http://localhost:8000/api/user/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Image uploaded successfully and pending approval");
      
      window.location.reload();
    } catch (error) {
      console.error("Error uploading:", error);
      console.log("Error response:", error.response);
    }
  };
  
  const openModal = (imageUrls) => {
    setSelectedImage({ imageUrls });
    setIsModalOpen(true);

    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);

    document.body.classList.remove("modal-open");
  };

   return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Pets Available to Adopt</h1>
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition duration-300"
          >
            {isFormVisible ? "Pending" : "+ Add Pets"}
          </button>
        </div>
      </div>
      {isFormVisible && (
  <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Pets for Adoption Form</h3>
      <form onSubmit={handleAddToGallery}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700">Maximum of 4 images</span>
            <input
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Caption:</span>
            <input
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              type="text"
              placeholder="Enter Caption"
              value={caption}
              onChange={handleEditCaption}
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Breed:</span>
            <input
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              type="text"
              placeholder="Enter Breed"
              value={breed}
              onChange={handleEditBreed}
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Species:</span>
            <input
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              type="text"
              placeholder="Type of animal"
              value={species}
              onChange={handleEditSpecies}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Select Gender:</span>
            <select
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              value={gender}
              onChange={handleEditGender}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Age:</span>
            <input
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              type="text"
              placeholder="Age in months"
              value={age}
              onChange={handleEditAge}
              required
            />
          </label>
          <div className="col-span-2">
            <span className="text-gray-700">Medical History:</span>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  value="vaccinated"
                  checked={medhistory.includes("vaccinated")}
                  onChange={handleEditMedHistory}
                />
                <span className="ml-2">Vaccinated</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  value="dewormed"
                  checked={medhistory.includes("dewormed")}
                  onChange={handleEditMedHistory}
                />
                <span className="ml-2">Dewormed</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  value="neutered"
                  checked={medhistory.includes("neutered")}
                  onChange={handleEditMedHistory}
                />
                <span className="ml-2">Neutered</span>
              </label>
            </div>
          </div>
          <label className="block">
            <span className="text-gray-700">Others:</span>
            <input
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              type="text"
              placeholder="Please specify"
              value={others}
              onChange={handleEditOthers}
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            onClick={() => setIsFormVisible(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
          >
            Add to Gallery
          </button>
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="ml-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usergalleryData.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <img
                alt={item.caption}
                src={`http://localhost:8000/uploads/${item.imageUrls[0]}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <p className="text-xs font-medium text-green-400"> {item._id}</p>
                <p className="text-sm text-gray-600"><span style={{ fontWeight: 'bold' }}>Caption:</span> {item.caption}</p>
                <p className="text-sm text-gray-600"><span style={{ fontWeight: 'bold' }}>Species:</span> {item.species}</p>
                <p className="text-sm text-gray-600"><span style={{ fontWeight: 'bold' }}>Breed:</span> {item.breed}</p>
                <p className="text-sm text-gray-600"><span style={{ fontWeight: 'bold' }}>Gender:</span> {item.gender}</p>
                <p className="text-sm text-gray-600"><span style={{ fontWeight: 'bold' }}>Age in months:</span> {item.age}</p>
                <p className="text-sm text-gray-600">
                <span style={{ fontWeight: 'bold' }}>Medical History:</span> 
                  {item.medhistory.length > 0 ? (
                    <>
                      {item.medhistory.join(", ")}
                      {item.others ? `, ${item.others}` : ''}
                    </>
                  ) : (
                    item.others
                  )}
              </p>
                <TalkToTheUser imageUrl={item.imageUrls[0]} petId={item._id} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FriendNeedsHome;
