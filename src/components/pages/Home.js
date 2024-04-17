import React, { useState, useEffect, useRef } from "react";
import bghomemain1 from "../assets/bg-home-main1.png";
import bghomemain2 from "../assets/bg-home-main2.png";
import bghomemain3 from "../assets/bg-home-main3.png";
import bghomemain4 from "../assets/bg-home-main4.png";
import bghomemain5 from "../assets/bg-home-main5.png";

import dog from "../assets/dog.svg";
import "./pagescss/Home.css";
import "./animate.css";

import { Link } from "react-router-dom";

function Home() {
  const images = [
    bghomemain1,
    bghomemain2,
    bghomemain3,
    bghomemain4,
    bghomemain5,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <section>
      {/* <!-- Container --> */}
      <div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* <!-- Component --> */}
        <div class="grid grid-cols-1 items-center gap-12 sm:gap-20 md:grid-cols-2">
          {/* <!-- Heading Div --> */}
          <div
            class="max-w-[720px] lg:max-w-[842px] "
            data-aos="fade-up-right"
            data-aos-duration="1500"
          >
            <h1 class="mb-4 text-4xl font-semibold md:text-6xl">
              <span class="title-word title-word-1">Adopt</span>{" "}
             
              <span class="title-word title-word-2">a</span> {" "}
              <span class=" bg-[url('https://i.ibb.co/YXSVt4K/rectangle.png')] bg-cover bg-center px-4 text-white">
                <span class="title-word title-word-3">Friend</span>
              </span>
            </h1>
            <p class="mb-6 max-w-[528px] text-xl text-[#636262] md:mb-10 lg:mb-12">
              Providing a loving and nurturing environment ensures that pets
              have a happy and secure home where they can thrive.
            </p>
            <Link
              to="/about"
              class="mb-6 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(105,_221,_0)_6px_6px] md:mb-10 lg:mb-12"
            >
              Know more
            </Link>
          </div>
          {/* <!-- Image Div --> */}
          <div class="relative floating left-4 h-full max-h-[562px] w-[85%] overflow-visible md:left-0 md:w-[95%] lg:w-full">
            <img
              src={dog}
              alt=""
              class="mx-auto block h-full w-full max-w-[800px] rounded-2xl object-cover"
              data-aos="flip-up"
              data-aos-duration="1500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
