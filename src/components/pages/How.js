import React, { useState } from "react";
import "./pagescss/How.css";

function How() {
  // State to manage visibility of each FAQ item
  const [showAnswers, setShowAnswers] = useState(Array(6).fill(false));

  // Function to toggle visibility of an FAQ item
  const toggleAnswer = (index) => {
    const updatedAnswers = [...showAnswers];
    updatedAnswers[index] = !updatedAnswers[index];
    setShowAnswers(updatedAnswers);
  };

  return (
    <>
      {/* Section FAQ */}
      <section>
        {/* FAQ Container */}
        <div
          className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24"
          data-aos="flip-up"
          data-aos-duration="1500"
        >
          {/* FAQ Title */}
          <div className="mb-8 text-center md:mb-12 lg:mb-16">
            <h2 className="text-3xl font-bold md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[#647084]">
              What do you need to know before adopting a Fur Baby:
            </p>
          </div>
          {/* FAQ Content */}
          <div className="mb-12 flex flex-wrap justify-center gap-4 lg:grid-cols-2">
            {/* FAQ Items */}
            <div className="mb-6 border border-solid border-[#dfdfdf] p-8 lg:max-w-xl">
              <div
                className="flex cursor-pointer justify-between"
                onClick={() => toggleAnswer(0)}
              >
                <p className="text-xl font-bold">Application</p>
                <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                  {showAnswers[0] ? (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  ) : (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  )}
                  <div className="h-0.5 w-5 bg-[#6dbb48]"></div>
                </div>
              </div>
              {showAnswers[0] && (
                <p className="mb-4 mt-4">
                  The first pet adoption requirement is to submit an
                  application. <br />
                  <br />
                  Most shelters and rescues take applications on a first-come
                  basis, so if you see a dog or cat you’re interested in, make
                  sure you’re ready to fill out and submit the application
                  quickly.
                </p>
              )}
            </div>
            {/* 2nd Item */}
            <div className="mb-6 border border-solid border-[#dfdfdf] p-8 lg:max-w-xl">
              <div
                className="flex cursor-pointer justify-between"
                onClick={() => toggleAnswer(1)}
              >
                <p className="text-xl font-bold">Home Visit</p>
                <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                  {showAnswers[1] ? (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  ) : (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  )}
                  <div className="h-0.5 w-5 bg-[#6dbb48]"></div>
                </div>
              </div>
              {showAnswers[1] && (
                <p className="mb-4 mt-4">
                  Shelters and rescues may want a specific environment for the
                  cats or dogs that they adopt out. <br />
                  <br />A representative of the organization may visit your home
                  to make sure your home is suitable and safe for the pet. A
                  larger dog may require a fenced yard or a senior pet may need
                  a home without stairs. Staff will let you know if a home visit
                  is needed before adopting a pet.
                </p>
              )}
            </div>
            {/* Repeat similar structure for other FAQ items */}
            {/* 3rd Item */}
            <div className="mb-6 border border-solid border-[#dfdfdf] p-8 lg:max-w-xl">
              <div
                className="flex cursor-pointer justify-between"
                onClick={() => toggleAnswer(2)}
              >
                <p className="text-xl font-bold">Age Requirements</p>
                <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                  {showAnswers[2] ? (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  ) : (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  )}
                  <div className="h-0.5 w-5 bg-[#6dbb48]"></div>
                </div>
              </div>
              {showAnswers[2] && (
                <p className="mb-4 mt-4">
                  Most shelters and rescues will require you to be at least 18
                  years old to adopt a pet.
                </p>
              )}
            </div>
            {/* 4th Item */}
            <div className="mb-6 border border-solid border-[#dfdfdf] p-8 lg:max-w-xl">
              <div
                className="flex cursor-pointer justify-between"
                onClick={() => toggleAnswer(3)}
              >
                <p className="text-xl font-bold">Valid Identification</p>
                <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                  {showAnswers[3] ? (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  ) : (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  )}
                  <div className="h-0.5 w-5 bg-[#6dbb48]"></div>
                </div>
              </div>
              {showAnswers[3] && (
                <p className="mb-4 mt-4">
                  In order to verify your age and where you live, you’ll need to
                  provide valid identification to shelter or rescue staff.
                </p>
              )}
            </div>
            {/* 5th Item */}
            <div className="mb-6 border border-solid border-[#dfdfdf] p-8 lg:max-w-xl">
              <div
                className="flex cursor-pointer justify-between"
                onClick={() => toggleAnswer(4)}
              >
                <p className="text-xl font-bold">Family Meet and Greet</p>
                <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                  {showAnswers[4] ? (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  ) : (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  )}
                  <div className="h-0.5 w-5 bg-[#6dbb48]"></div>
                </div>
              </div>
              {showAnswers[4] && (
                <p className="mb-4 mt-4">
                  It’s a good idea to make sure everyone in the family gets
                  along with the new pet, which is why most shelters and rescues
                  require a family meet-and-greet before adoption. <br />
                  <br />
                  Everyone in the home, including dogs and cats that already
                  live with you, should meet the pet you want to adopt to see if
                  they’ll be a good fit for your family.
                </p>
              )}
            </div>
            {/* 6th Item */}
            <div className="mb-6 border border-solid border-[#dfdfdf] p-8 lg:max-w-xl">
              <div
                className="flex cursor-pointer justify-between"
                onClick={() => toggleAnswer(5)}
              >
                <p className="text-xl font-bold">PawDopt Requirements</p>
                <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                  {showAnswers[5] ? (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  ) : (
                    <div className="absolute h-5 w-0.5 bg-[#6dbb48]"></div>
                  )}
                  <div className="h-0.5 w-5 bg-[#6dbb48]"></div>
                </div>
              </div>
              {showAnswers[5] && (
                <p className="mb-4 mt-4">
                  - Adopter must be at least 18 years of age and have
                  identification. <br />
                  <br />
                  - Some members of the household should be present for the
                  adoption. <br />
                  <br />
                  - All animals must be indoor house pets. <br />
                  <br />
                  - Adopter must be willing to allow an PawDopt representative
                  to make an adoption follow up, either in person, telephone or
                  by gmeet. <br />
                  <br />
                  - Spaying/neutering of cats and dogs adopted through any
                  humane organization is a state law and will be enforced by the
                  Department of Agriculture.
                  <br />
                  <br />
                  - When adopting a pet from PawDopt, a legally binding and
                  enforced contract must be signed.
                  <br />
                  <br />
                  - If at any time, you are unable to keep the pet, or unable to
                  provide it with proper care, you must contact PawDopt first.
                  <br />
                  <br />
                  - One week notice may be necessary due to space requirements,
                  but realize that PawDopt may not be able to accept the animal.
                  <br />
                  <br />
                  - You must need to be agree that kahit nauwi mo na ang pet we
                  need to visit your home once a week in 1 month to monitor if
                  the pet is surely safe.
                  <br />
                  <br />
                </p>
              )}
            </div>
          </div>
          {/* FAQ Text */}
          <p className="text-center">
            Can’t find the answer you’re looking for? Reach out to our{" "}
            <a href="#">customer support team</a>.
          </p>
        </div>
      </section>
    </>
  );
}

export default How;
