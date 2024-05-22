import React from "react";
import cat from "../assets/bg-home-main4.png";

const Team = () => {
  return (
    <div>
      {/* Section Team */}{" "}
      <section className="bg-[#f2f2f7]">
        {" "}
        {/* Container */}{" "}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          {" "}
          {/* Title */}{" "}
          <h2
            className="text-center text-3xl font-bold md:text-5xl"
            data-aos="flip-down"
            data-aos-duration="1500"
          >
            Staff Directory
          </h2>
          {/* Staff List */}{" "}
          <br />
          <ul
            className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <li className="mx-auto flex max-w-xs flex-col items-center gap-4 px-8 py-6 text-center">
              <img
                src={cat}
                alt=""
                className="mb-4 inline-block h-52 w-full object-cover"
              />
              <p className="font-bold">Dana Abegail Manuel</p>
              <p className="text-sm text-[#636262]"></p>
            </li>
            <li className="mx-auto flex max-w-xs flex-col items-center gap-4 px-8 py-6 text-center">
              <img
                src={cat}
                alt=""
                className="mb-4 inline-block h-52 w-full object-cover"
              />
              <p className="font-bold">Al Leonard Ballesteros</p>
              <p className="text-sm text-[#636262]">
                
              </p>
            </li>
            <li className="mx-auto flex max-w-xs flex-col items-center gap-4 px-8 py-6 text-center">
              <img
                src={cat}
                alt=""
                className="mb-4 inline-block h-52 w-full object-cover"
              />
              <p className="font-bold">Andrei Valencirina</p>
              <p className="text-sm text-[#636262]"></p>
            </li>
            <li className="mx-auto flex max-w-xs flex-col items-center gap-4 px-8 py-6 text-center">
              <img
                src={cat}
                alt=""
                className="mb-4 inline-block h-52 w-full object-cover"
              />
              <p className="font-bold">Kc Rose Calaguio</p>
              <p className="text-sm text-[#636262]"></p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Team;
