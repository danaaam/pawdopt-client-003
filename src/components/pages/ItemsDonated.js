import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageModal from "./ImageModalID";
import "./pagescss/FriendNeedsHome.css";

function ItemsDonated() {
  const [galleryData, setGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/gallery");
        setGalleryData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const donatedItems = galleryData.filter(
    (item) => item.category === "item donated"
  );

  const openModal = (imageUrl, caption) => {
    setSelectedImage({ imageUrl, caption });
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <section className="text-gray-600 body-font">
      <br />
      <div
        className="flex items-center justify-center font-semibold text-xl"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <h1>Items Donated</h1>
      </div>
      <div
        className="container px-5 py-24 mx-auto"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <div className="flex flex-wrap -m-4">
          {donatedItems.map((item, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a
                className="block relative h-48 rounded overflow-hidden"
                onClick={() => openModal(item.imageUrl, item.caption)}
              >
                <img
                  alt={item.caption}
                  className="object-cover object-center w-full h-full block"
                  src={`http://localhost:8000/uploads/${item.imageUrl}`}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Donated
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {item.caption}
                </h2>
                <p className="mt-1">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ImageModal
          imageUrl={`http://localhost:8000/uploads/${selectedImage.imageUrl}`}
          caption={selectedImage.caption}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

export default ItemsDonated;
