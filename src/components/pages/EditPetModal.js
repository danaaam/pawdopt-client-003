import React, { useState, useEffect } from "react";

const EditPetModal = ({ isOpen, onClose, onSave, pet }) => {
  const [caption, setCaption] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [medhistory, setMedHistory] = useState("");
  const [species, setSpecies] = useState("");
  const [others, setOthers] = useState("");

  useEffect(() => {
    if (pet) {
      setCaption(pet.caption || "");
      setBreed(pet.breed || "");
      setGender(pet.gender || "");
      setAge(pet.age || "");
      setMedHistory(pet.medhistory ? pet.medhistory.join(", ") : "");
      setSpecies(pet.species || "");
      setOthers(pet.others || "");
    }
  }, [pet]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      ...pet,
      caption,
      breed,
      gender,
      age,
      medhistory: medhistory.split(",").map((item) => item.trim()),
      species,
      others,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-3/4 max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Edit Pet Information</h3>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Pet's Name:
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Breed:
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Gender:
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Medical History:
              </label>
              <input
                type="text"
                value={medhistory}
                onChange={(e) => setMedHistory(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Species:
              </label>
              <input
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Additional Information:
              </label>
              <textarea
                value={others}
                onChange={(e) => setOthers(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Update Pet
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPetModal;
