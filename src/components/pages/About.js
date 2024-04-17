import React from "react";
import dog from "../assets/dog.png";
import cat from "../assets/cat.png";

function About() {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-14 lg:py-24">
        {" "}
        {/* Title */}{" "}
        <h2
          className="mb-8 text-3xl font-bold md:text-5xl lg:mb-14"
          data-aos="flip-up"
          data-aos-duration="1500"
        >
          What is PawDopt?
        </h2>
        <p
          className="mb-8 max-w-lg text-sm font-medium text-[#3b3b3b] sm:text-base lg:mb-24"
          data-aos="fade-up-left"
          data-aos-duration="1500"
        >
          PawDopt was formed in this year 2023 by a dedicated group of animal
          lovers determined to help the plight of animals in the Dagupan.
          <br />
          <br />
          We are a non-profit, non-government organization that receives no
          government funding; we rely solely on private donations.
        </p>
        {/* Mission */}
        <div
          className="grid gap-10 lg:grid-cols-2 lg:gap-12 py-2"
          data-aos="zoom-in-right"
          data-aos-duration="1500"
        >
          <img
            src={dog}
            alt=""
            className="h-250 w-full inline-block  rounded-2xl object-cover floating"
          />
          <div className="flex flex-col gap-5 rounded-2xl  p-10 sm:p-20">
            <h2 className="text-3xl font-bold md:text-5xl">Our Mission</h2>
            <p className="text-sm font-medium text-[#3b3b3b] sm:text-base">
              {" "}
              Connecting families with their perfect furry friends and finding
              forever homes for strays. Our commitment: responsible pet
              ownership, animal rights, and compassionate adoptions.
            </p>
          </div>
        </div>
        <br />
        <br />
        {/* Vision */}
        <div
          className="grid gap-10 lg:grid-cols-2 lg:gap-12 py-2"
          data-aos="zoom-in-left"
          data-aos-duration="1500"
        >
          <div className="flex flex-col gap-5 rounded-2xl  p-10 sm:p-20">
            <h2 className="text-3xl font-bold md:text-5xl">Our Vision</h2>
            <p className="text-sm font-medium text-[#3b3b3b] sm:text-base">
              Empowering a world in which every animal finds a caring home and
              every adoption results in a joyous occasion marked by compassion,
              hope, and fresh starts.
            </p>
          </div>
          <div className="grid gap-10 py-12">
            <img
              src={cat}
              alt=""
              className="inline-block h-250 w-full rounded-2xl object-cover floating"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
