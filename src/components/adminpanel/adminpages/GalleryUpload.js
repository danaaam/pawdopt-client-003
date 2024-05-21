import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function GalleryUpload() {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedCaption, setEditedCaption] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/gallery');
      setGalleryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access. Please log in again.');
      }
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

  const handleEdit = (id, currentCaption) => {
    // Set the editing item id and initialize the edited caption with the current caption
    setEditingItemId(id);
    setEditedCaption(currentCaption);
  };

  const saveEditedCaption = async (id) => {
    // Perform your PUT request to save the edited caption
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No token found. Please log in.');
        return;
      }

      // Construct the updated data object
      const updatedData = {
        caption: editedCaption,
      };

      // Make the PUT request to update the caption
      const response = await axios.put(`http://localhost:8000/api/gallery/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the caption in the state
      setEditingItemId(null); // Reset editing state
      setCaption(editedCaption);

      // Optionally, refresh the gallery data
      fetchData();

      // Display success message
      toast.success('Image caption edited successfully');
    } catch (error) {
      console.error('Error editing image caption:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      toast.error('Failed to edit image caption. Please try again.');
    }
  };
  
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('No token found. Please log in.');
          return;
        }

        // Log request details
        console.log('Deleting image with ID:', id);
        console.log('Token:', token);

        const response = await axios.delete(`http://localhost:8000/api/gallery/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log response details
        console.log('Delete response:', response.data);

        setGalleryData((prevData) => prevData.filter(item => item._id !== id));
        toast.success('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);

          if (error.response.status === 401) {
            toast.error('Unauthorized access. Please log in again.');
          } else {
            toast.error(`Error: ${error.response.status} - ${error.response.data.message}`);
          }
        } else {
          toast.error('Network error. Please try again.');
        }
      }
    }
  };

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No token found. Please log in.');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('category', category);
      formData.append('caption', caption);

      // Log request details
      console.log('Uploading new image');
      console.log('Selected File:', selectedFile);
      console.log('Category:', category);
      console.log('Caption:', caption);
      console.log('Token:', token);

      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log response details
      console.log('Upload response:', response.data);

      toast.success('Image uploaded successfully');

      // Reset form fields
      setSelectedFile(null);
      setCategory('');
      setCaption('');

      fetchData(); // Refresh the gallery data after uploading
    } catch (error) {
      console.error('Error uploading:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);

        if (error.response.status === 401) {
          toast.error('Unauthorized access. Please log in again.');
        } else {
          toast.error(`Error: ${error.response.status} - ${error.response.data.message}`);
        }
      } else {
        toast.error('Network error. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pets-items max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-4">
        <label className="block mb-4">
          <span className="text-gray-700">Select Category:</span>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={category} onChange={handleCategoryChange}>
            <option>Select option</option>
            <option value="successfully adopted">Successfully Adopted Pets</option>
            <option value="item donated">Item Donations</option>
          </select>
        </label>
        <input type="file" accept="image/*" className="mb-4" onChange={handleFileChange} />
        <input type="text" placeholder="Caption" value={caption} className="mb-4 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleCaptionChange} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpload}>Upload</button>
      </div>
      <h3 className="px-4 py-2 bg-gray-100 border-t">Uploaded Images</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {galleryData.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img src={`http://localhost:8000/uploads/${item.imageUrl}`} alt={item.caption} className="w-full h-64 object-cover" />
            <div className="p-4">
              {editingItemId === item._id ? (
                <div className="mb-4">
                <textarea
                    placeholder="Edit Caption"
                    value={editedCaption}
                    onChange={(e) => setEditedCaption(e.target.value)}
                    className="mb-2 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    style={{ height: `${Math.max(150, editedCaption.split('\n').length * 20)}px` }}
                />
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => saveEditedCaption(item._id)}>Save</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setEditingItemId(null)}>Cancel</button>
                </div>
            </div>
            
            
              ) : (
                <>
                  <p className="text-gray-800 text-lg font-semibold mb-2">{item.caption}</p>
                  <p className="text-gray-600 mb-4">{item.category}</p>
                  <div className="flex justify-between">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(item._id, item.caption)}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default GalleryUpload;
