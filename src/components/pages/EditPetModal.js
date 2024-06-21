// EditPetModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditPetModal({ isOpen, onClose, petData, onUpdate }) {
  const [caption, setCaption] = useState(petData.caption);
  const [breed, setBreed] = useState(petData.breed);
  const [age, setAge] = useState(petData.age);
  const [gender, setGender] = useState(petData.gender);
  const [species, setSpecies] = useState(petData.species);
  const [medhistory, setMedHistory] = useState(petData.medhistory);
  const [others, setOthers] = useState(petData.others);

  useEffect(() => {
    setCaption(petData.caption);
    setBreed(petData.breed);
    setAge(petData.age);
    setGender(petData.gender);
    setSpecies(petData.species);
    setMedHistory(petData.medhistory);
    setOthers(petData.others);
  }, [petData]);

  const handleEditMedHistory = (event) => {
    const { value } = event.target;
    if (medhistory.includes(value)) {
      setMedHistory(medhistory.filter((term) => term !== value));
    } else {
      setMedHistory([...medhistory, value]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/user/gallery/${petData._id}`, {
        caption,
        breed,
        age,
        gender,
        species,
        medhistory,
        others,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Pet details updated successfully");
      onUpdate(); // Call the callback function to refresh the gallery
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Error updating pet");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Edit Pet Details</h3>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">Caption:</span>
              <input
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Breed:</span>
              <input
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Species:</span>
              <input
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Select Gender:</span>
              <select
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Age:</span>
              <input
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                value={others}
                onChange={(e) => setOthers(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPetModal;
