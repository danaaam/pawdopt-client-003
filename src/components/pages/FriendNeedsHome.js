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
  }, []);

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
  

  const handleAddToGallery = async () => {
    try {
      const token = await localStorage.getItem("token");
      const verified = await localStorage.getItem("verified");

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
      if (
        !selectedImage ||
        !caption ||
        !breed ||
        !gender ||
        !age ||
        medhistory.length === 0
      ) {
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
    <div className="gallery-main">
      <section className="text-gray-600 body-font">
        <div className="flex items-center justify-center font-semibold text-xl">
          <h1>Pets Available to Adopt</h1>
        </div>
        <div className="gallery-container">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="max-h-12 px-2 border-solid rounded-2xl py-3 font-semibold hover:bg-green-500 hover:text-white"
            >
               {isFormVisible
            ? "Pending"
            : "+ Add Pets"}
        </button>
        </div>
        {isFormVisible && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Pets for Adoption Form
                      </h3>
                      <div className="mt-2">
                        <label className="form-group-label">
                          Maximum of 4 images
                          <input
                            className="form-group-input"
                            type="file"
                            accept="images/*"
                            onChange={handleFileChange}
                            multiple
                            required
                          />
                        </label>
                        <label className="form-group-label">
                          Caption:
                          <input
                            className="form-group-input"
                            type="text"
                            placeholder="Enter Caption"
                            value={caption}
                            onChange={handleEditCaption}
                            required
                          />
                        </label>
                        <label className="form-group-label">
                          Breed:
                          <input
                            className="form-group-input"
                            type="text"
                            placeholder="Enter Breed"
                            value={breed}
                            onChange={handleEditBreed}
                            required
                          />
                        </label>
                        <label className="form-group-label">
                          Species:
                          <input
                            className="form-group-input"
                            type="text"
                            placeholder="Type of animal"
                            value={species}
                            onChange={handleEditSpecies}
                          />
                        </label>
                        <label className="form-group-label">
                          Select gender:
                          <select
                            value={gender}
                            onChange={handleEditGender}
                            required
                          >
                            <option value="" required disabled>
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </label>
                        <label className="form-group-label">
                          Age:
                          <input
                            className="form-group-input"
                            type="text"
                            placeholder="Age in months"
                            value={age}
                            onChange={handleEditAge}
                            required
                          />
                        </label>
                        <br />
                        <label className="form-group-label">
                          Medical History:{" "}
                        </label>
                        <label className="form-group-label px-2">
                          <input
                            className="form-group-input"
                            type="checkbox"
                            value="vaccinated"
                            checked={medhistory.includes("vaccinated")}
                            onChange={handleEditMedHistory}
                          />
                          Vaccinated
                        </label>
                        <label className="form-group-label">
                          <input
                            className="form-group-input"
                            type="checkbox"
                            value="dewormed"
                            checked={medhistory.includes("dewormed")}
                            onChange={handleEditMedHistory}
                          />
                          Dewormed
                        </label>
                        <label className="form-group-label">
                          <input
                            className="form-group-input"
                            type="checkbox"
                            value="neutered"
                            checked={medhistory.includes("neutered")}
                            onChange={handleEditMedHistory}
                          />
                          Neutered
                        </label>
                        <label className="form-group-label">
                          Others:
                          <input
                            className="form-group-input"
                            type="text"
                            placeholder="Please specify"
                            value={others}
                            onChange={handleEditOthers}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={handleAddToGallery} className="add-gallery">
                    Add to Gallery
                  </button>
                  <button
                    onClick={() => setIsFormVisible(false)}
                    className="add-gallery"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {usergalleryData.map((item) => (
                <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a
                    className="block relative h-48 rounded overflow-hidden"
                    onClick={() => openModal(item.imageUrls[0])} // Assuming you want to open modal with the first image URL
                  >
                    <img
                      alt={item.caption}
                      className="w-full h-full object-cover"
                      style={{ width: "200px", height: "200px" }}
                      src={`http://localhost:8000/uploads/${item.imageUrls[0]}`}
                    />
                  </a>
                  <div className="mt-4">
                  <p>
                      <strong>ID:</strong> {item._id}
                    </p>
                    <p>
                      <strong>Caption:</strong> {item.caption}
                    </p>
                    <p>
                      <strong>Species:</strong> {item.species}
                    </p>
                    <p>
                      <strong>Breed:</strong> {item.breed}
                    </p>
                    <p>
                      <strong>Gender:</strong> {item.gender}
                    </p>
                    <p>
                      <strong>Age in months:</strong> {item.age}
                    </p>
                    <p>
                      <strong>Medical History:</strong> {item.medhistory.join(", ")} {item.others}
                    </p>
                    <TalkToTheUser imageUrl={item.imageUrls[0]} petId={item._id} />

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FriendNeedsHome;
