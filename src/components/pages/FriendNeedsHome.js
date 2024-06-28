import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pagescss/FriendNeedsHome.css";
import { useNavigate } from "react-router-dom";
import AdoptButton from "./AdoptButton";
import { toast } from "react-toastify";


function FriendNeedsHome() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userGalleryData, setUserGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate("");
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track adoption submission
  const [verified, setVerified] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editPet, setEditPet] = useState(null); // State for the pet being edited
  const [userInfo, setUserInfo] = useState({});
  const [errorMessageCaption, setErrorMessageCaption] = useState('');
  const [errorMessageBreed, setErrorMessageBreed] = useState('');


  // State variables for form fields
  const [caption, setCaption] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medhistory, setMedHistory] = useState([]);
  const [species, setSpecies] = useState("");
  const [others, setOthers] = useState("");


  const handleSetVerified = () => {
    const isVerified = localStorage.getItem("verified");
    if (isVerified !== null) {
      const verifiedStatus = isVerified === "true";
      setVerified(verifiedStatus);
    } else {
      console.log("Verification status not found in local storage");
    }
  };


  const handleAdoptionSubmitted = () => {
    setFormSubmitted(true);
  };


  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role");


  const handleEditCaption = (event) => {
    const value = event.target.value;
    if (value.length > 30) {
      setErrorMessageCaption('Character limit exceeded. Maximum length is 30 characters.');
    } else if (value.length < 3 && value.length > 0) {
      setErrorMessageCaption('Minimum length is 3 characters.');
      setCaption(value);
    } else {
      setErrorMessageCaption('');
      setCaption(value);
    }
  };


  const handleEditBreed = (event) => {
    const value = event.target.value;
    if (value.length > 30) {
      setErrorMessageBreed('Character limit exceeded. Maximum length is 30 characters.');
    } else if (value.length < 3 && value.length > 0) {
      setErrorMessageBreed('Minimum length is 3 characters.');
      setBreed(value);
    } else {
      setErrorMessageBreed('');
      setBreed(value);
    }
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
      setMedHistory(medhistory.filter((term) => term !== value));
    } else {
      setMedHistory([...medhistory, value]);
    }
  };


  const handleButtonClick = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      setIsFormVisible(!isFormVisible);
    } else {
      toast.error("You need to login first");
      navigate("/signin");
    }
  };


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedImage(selectedFiles);
  };


  const handlePdfChange = (event) => {
    const selectedPdf = Array.from(event.target.files);
    setSelectedPdf(selectedPdf);
   
  };


  const handleEditPet = (pet) => {
    setEditPet(pet);
    setCaption(pet.caption);
    setBreed(pet.breed);
    setAge(pet.age);
    setGender(pet.gender);
    setSpecies(pet.species);
    setOthers(pet.others);
    setSelectedImage(pet.imageUrls ? [pet.imageUrls[0]] : null);
    setSelectedPdf(pet.pdfUrls ? [pet.pdfUrls] : null);
    setEditMode(true);
    setIsModalOpen(true);
  };
 


  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditPet(null);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/gallery"
      );
      const sortedPets = response.data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      const updatedData = sortedPets.map((image) => ({
        ...image,
        isAdoptFormVisible: false,
      }));
      setUserGalleryData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  const handleAddToGallery = async (event) => {
    event.preventDefault();


    try {
        const token = localStorage.getItem("token");


        if (!token) {
            toast.error("You need to log in first, please log in");
            navigate("/signin");
            return;
        }


        if (!selectedImage || !caption || !breed || !gender || !age || medhistory.length === 0) {
            toast.error("All fields are required");
            return;
        }


        const formData = new FormData();
        selectedImage.forEach((file) => formData.append("files", file));
        if (selectedPdf.length > 0) {
            selectedPdf.forEach((file) => formData.append("files", file));
        }
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
                'Content-Type': 'multipart/form-data'
            },
        });


        toast.success("Files uploaded successfully");
        setFormSubmitted(true);
        setIsFormVisible(false);
    } catch (error) {
        console.error("Error uploading:", error);
        console.log("Error response:", error.response);
        toast.error("Error uploading files");
    }
};




  const handleDeletePet = async (petId) => {
    try {
      const token = localStorage.getItem("token");


      if (!token) {
        toast.error("You need to log in first, please log in");
        navigate("/signin");
        return;
      }


      await axios.delete(`http://localhost:8000/api/user/gallery/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      toast.success("Pet deleted successfully");
      setUpdateCount(updateCount + 1);
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Error deleting pet");
    }
  };


  const updateGallery = async (event) => {
    event.preventDefault();
    if (!editPet) return;
 
    const id = editPet._id;
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('others', others);
    formData.append('species', species);
    formData.append('gender', gender);
    formData.append("medhistory", medhistory.join(", "));
 
    if (selectedImage && selectedImage.length > 0) {
      formData.append('image', selectedImage[0]);
    }
 
    if (selectedPdf && selectedPdf.length > 0) {
      formData.append('pdf', selectedPdf[0]);
    }
 
    console.log("Form Data: ", {
      id,
      caption,
      breed,
      age,
      others,
      species,
      gender,
      medhistory,
      selectedImage,
      selectedPdf
    });
 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:8000/api/user/gallery/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Ensure the correct content type is set
        }
      });
 
      toast.success('Updated pet:', response.data);
      window.location.reload();
      fetchData();
    } catch (error) {
      toast.error('Error updating pet:', error);
    }
  };
 


       
    useEffect(() => {
    fetchData();
    handleSetVerified();
  }, [updateCount, formSubmitted]);




  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getallusers");
        const userMap = response.data.reduce((map, user) => {
          map[user._id] = user;
          return map;
        }, {});
        setUserInfo(userMap);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Pets Available to Adopt
        </h1>
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => handleButtonClick()}
            className={`px-4 py-2 rounded-md ${
              !verified
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            } transition duration-300`}
            disabled={!verified}
          >
            {isFormVisible ? "Cancel" : "+ Add Pets"}
          </button>
        </div>
      </div>
      {isFormVisible && (
        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Pets for Adoption Form
            </h3>
            <form onSubmit={handleAddToGallery}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Image:
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="w-full"
                  />
                </div>
                  <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Pet's Name:
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={handleEditCaption}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                  {errorMessageCaption && (
                    <p className="text-red-500 mt-1">{errorMessageCaption}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Breed:
                  </label>
                  <input
                    type="text"
                    value={breed}
                    onChange={handleEditBreed}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                {errorMessageBreed && (
                    <p className="text-red-500 mt-1">{errorMessageBreed}</p>
                  )}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Gender:
                  </label>
                  <select
                    value={gender}
                    onChange={handleEditGender}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Age:
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={handleEditAge}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Medical History:
                </label>
                <div className="w-full border border-gray-300 p-4 rounded-md space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="vaccinated"
                      name="vaccinated"
                      checked={medhistory.vaccinated}
                      onChange={handleEditMedHistory}
                      className="h-5 w-5 text-indigo-600 form-checkbox"
                    />
                    <label htmlFor="vaccinated" className="ml-2 text-gray-700">
                      Vaccinated
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dewormed"
                      name="dewormed"
                      checked={medhistory.dewormed}
                      onChange={handleEditMedHistory}
                      className="h-5 w-5 text-indigo-600 form-checkbox"
                    />
                    <label htmlFor="dewormed" className="ml-2 text-gray-700">
                      Dewormed
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="parasiteFree"
                      name="parasiteFree"
                      checked={medhistory.parasiteFree}
                      onChange={handleEditMedHistory}
                      className="h-5 w-5 text-indigo-600 form-checkbox"
                    />
                    <label htmlFor="parasiteFree" className="ml-2 text-gray-700">
                      Parasite Free
                    </label>
                  </div>
                  <div>
                  <label className="block mb-1 font-medium text-gray-700">
                  Pet's Medical Record (pdf file only)
                  </label>
                  <input
                    type="file"
                    onChange={handlePdfChange}
                    multiple
                    className="w-full"
                  />
                </div>
                </div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Species:
                  </label>
                  <input
                    type="text"
                    value={species}
                    onChange={handleEditSpecies}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Additional Information:
                  </label>
                  <textarea
                    value={others}
                    onChange={handleEditOthers}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                  {editMode ? "Update Pet" : "Add Pet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {userGalleryData.map((pet, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md">
        {pet.imageUrls.map((url, urlIndex) => (
          <img
            key={urlIndex}
            alt={pet.caption}
            src={`http://localhost:8000/uploads/${url}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
        <h3 className="text-lg font-semibold mb-2">{pet.caption}</h3>
        <p className="mb-1">
          <span className="font-medium">Breed:</span> {pet.breed}
        </p>
        <p className="mb-1">
          <span className="font-medium">Gender:</span> {pet.gender}
        </p>
        <p className="mb-1">
          <span className="font-medium">Age:</span> {pet.age}
        </p>
        <p className="mb-1">
          <span className="font-medium">Medical History:</span>{" "}
          {pet.medhistory.join(", ")}
        </p>
        <p className="mb-1">
  <span className="font-medium">Pet's Vet Card:</span>
  {pet.pdfUrls ? (
    <button
      onClick={() => window.open(`http://localhost:8000/files/${pet.pdfUrls}`, '_blank', 'noopener noreferrer')}
      className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 text-sm"
    >
      Click to View Document
    </button>
  ) : (
    <span className="ml-2">No files</span>
  )}
</p>
<p className="mb-1">
  <span className="font-medium">Species:</span> {pet.species}
</p>
<p className="mb-1">
  <span className="font-medium">Additional Info:</span> {pet.others}
</p>
<p className="mb-1">
  <span className="font-medium">Posted by:</span> {userInfo[pet.user_id]?.email}
</p>
<p className="mb-1">
  <span className="font-small">Contact:</span> {userInfo[pet.user_id]?.contactinfo}
</p>
<p className="mb-1">
  <span className="font-medium">Facebook:</span>
  <br />
  <a href={`https://${userInfo[pet.user_id]?.facebook}`} target="_blank" rel="noopener noreferrer">
    {userInfo[pet.user_id]?.facebook}
  </a>
</p>

{(userId === pet.user_id || role === "admin") && (
  <>
    <button
      onClick={() => handleDeletePet(pet._id)}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
    >
      Delete Pet
    </button>
    <button
      onClick={() => handleEditPet(pet)}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ml-2"
    >
      Edit Pet
    </button>
  </>
)}



        <AdoptButton
          imageUrl={pet.imageUrls[0]}
          petId={pet._id}
          onAdoptionSubmitted={handleAdoptionSubmitted}
          verified={verified}
          petOwnerId={pet.user_id}
        />
      </div>
    ))}
  </div>
</div>
{isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-3/4 max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Edit Pet Information</h3>
            <form onSubmit={updateGallery}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Pet's Name:</label>
                  <input
                    type="text"
                    value={caption}
                    onChange={handleEditCaption}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                  {errorMessageCaption && (
                    <p className="text-red-500 mt-1">{errorMessageCaption}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Breed:</label>
                  <input
                    type="text"
                    value={breed}
                    onChange={handleEditBreed}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                  {errorMessageBreed && (
                    <p className="text-red-500 mt-1">{errorMessageBreed}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Gender:</label>
                  <select
                    value={gender}
                    onChange={handleEditGender}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Age:</label>
                  <input
                    type="text"
                    value={age}
                    onChange={handleEditAge}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Medical History:</label>
                  <div className="w-full border border-gray-300 p-4 rounded-md space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="vaccinated"
                        name="vaccinated"
                        checked={medhistory.includes('vaccinated')}
                        value="vaccinated"
                        onChange={handleEditMedHistory}
                        className="h-5 w-5 text-indigo-600 form-checkbox"
                      />
                      <label htmlFor="vaccinated" className="ml-2 text-gray-700">
                        Vaccinated
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="neutered"
                        name="neutered"
                        checked={medhistory.includes('neutered')}
                        value="neutered"
                        onChange={handleEditMedHistory}
                        className="h-5 w-5 text-indigo-600 form-checkbox"
                      />
                      <label htmlFor="neutered" className="ml-2 text-gray-700">
                        Neutered/Spayed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="allergic"
                        name="allergic"
                        checked={medhistory.includes('allergic')}
                        value="allergic"
                        onChange={handleEditMedHistory}
                        className="h-5 w-5 text-indigo-600 form-checkbox"
                      />
                      <label htmlFor="allergic" className="ml-2 text-gray-700">
                        Allergic
                      </label>
                    </div>
                    <div className="mt-4">
                <label className="block mb-1 font-medium text-gray-700">Pet's Medical Record</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Species:</label>
                  <input
                    type="text"
                    value={species}
                    onChange={handleEditSpecies}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Others:</label>
                  <input
                    type="text"
                    value={others}
                    onChange={handleEditOthers}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>


              <div className="mt-4">
                <label className="block mb-1 font-medium text-gray-700">Upload Images:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default FriendNeedsHome;



