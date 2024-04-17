import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageModal from './ImageModal';
import './pagescss/Gallery.css';

function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [usergalleryData, setuserGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/gallery');
        setGalleryData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = (event) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/gallery');
      setuserGalleryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddToGallery = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('caption', caption);

      await axios.post('http://localhost:8000/api/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image uploaded successfully');

      // Reset form fields
      setSelectedImage(null);
      setCaption('');

      // Refresh the page by reloading it
      window.location.reload();
      fetchData();
    } catch (error) {
      console.error('Error uploading:', error);
      console.log('Error response:', error.response); // Log the detailed response
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userhandleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/user/gallery/${id}`);
        setuserGalleryData((prevData) => prevData.filter((item) => item._id !== id));
        window.location.reload();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const openModal = (imageUrl, caption) => {
    setSelectedImage({ imageUrl, caption });
    setIsModalOpen(true);
  
    // Add a class to the modal image when it is open
    document.body.classList.add('modal-open');
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  
    // Remove the class when the modal is closed
    document.body.classList.remove('modal-open');
  };
  

  return (
    <div className="gallery">
      <div className="success-donation">
        <h2>Successfully adopted & Items donated</h2>
      </div>
      {galleryData.map((item, index) => (
        <div className="admin-uploads" key={index}  >
          <img src={`http://localhost:8000/uploads/${item.imageUrl}`} alt={item.caption} className="admin-images" />
          <p>{item.caption}</p>
          <p>{item.category}</p>
        </div>
      ))}
      <div className="gallery-main">
        <div className="gallery-container">
          <h2>Gallery</h2>
          <button onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'hide pet adoption advocate' : 'pet adoption advocate'}
          </button>
          {isFormVisible && (
            <div>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <input type="text" placeholder="Caption" value={caption} onChange={handleImageUpload} />
              <button onClick={handleAddToGallery}>Add to Gallery</button>
            </div>
          )}
        </div>
      </div>
      {usergalleryData.map((item, index) => (
        <div className="gallery-uploads" key={index} onClick={() => openModal(item.imageUrl, item.caption)}>
          <img src={`http://localhost:8000/uploads/${item.imageUrl}`} alt={item.caption} className="gallery-images" />
          <p>{item.caption}</p>
          <button onClick={() => userhandleDelete(item._id)}>Delete</button>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <ImageModal
          imageUrl={`http://localhost:8000/uploads/${selectedImage.imageUrl}`}
          caption={selectedImage.caption}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Gallery;