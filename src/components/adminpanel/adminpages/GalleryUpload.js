import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function GalleryUpload() {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/gallery');
      setGalleryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };
  const handleEdit = async (id) => {
    const newCaption = prompt('Enter a new caption:');
    if (newCaption !== null) {
  
      const formData = new FormData();
      formData.append('caption', newCaption);
  
      //if (newImageFile) {
        
        //formData.append('image', newImageFile); }
  
      try {
        await axios.put(`http://localhost:8000/api/gallery/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        fetchData(); // Refresh the gallery data after editing
      } catch (error) {
        console.error('Error editing image:', error);
      }
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/gallery/${id}`);
        setGalleryData((prevData) => prevData.filter(item => item._id !== id));
        window.location.reload();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };
  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('category', category);
      formData.append('caption', caption);
  
      await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  
      toast.success('Image uploaded successfully');
  
      // Reset form fields
      setSelectedFile(null);
      setCategory('');
      setCaption('');
  
      // Refresh the page by reloading it
      window.location.reload();
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
<div class="pets-items max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="p-4">
    <label class="block mb-4">
      <span class="text-gray-700">Select Category:</span>
      <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={category} onChange={handleCategoryChange}>
        <option>Select option</option>
        <option value="successfully adopted">Successfully Adopted Pets</option>
        <option value="item donated">Item Donations</option>
      </select>
    </label>
    <input type="file" accept="image/*" class="mb-4" onChange={handleFileChange} />
    <input type="text" placeholder="Caption" value={caption} class="mb-4 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleCaptionChange} />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpload}>Upload</button>
  </div>
  <h3 class="px-4 py-2 bg-gray-100 border-t">Uploaded Images</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    {galleryData.map((item, index) => (
      <div key={index} class="bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <img src={`http://localhost:8000/uploads/${item.imageUrl}`} alt={item.caption} class="w-full h-64 object-cover" />
        <div class="p-4">
          <p class="text-gray-800 text-lg font-semibold mb-2">{item.caption}</p>
          <p class="text-gray-600 mb-4">{item.category}</p>
          <div class="flex justify-between">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(item._id)}>Edit</button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default GalleryUpload;
