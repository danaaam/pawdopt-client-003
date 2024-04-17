import React, { useState } from "react";
import "./Footer.css";
import { BsFillTelephoneFill, BsPaypal } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { AiFillMail } from "react-icons/ai";
import { TbSquareRoundedLetterG} from "react-icons/tb";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const address = "Bonuan Binloc Sitio America 336, Dagupan City";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=njichole@gmail.com`;

  const [showNumbers, setShowNumbers] = useState({
    paypal: false,
    telephone: false,
    letterG: false
  });

  const handleClick = (type) => {
    setShowNumbers({ ...showNumbers, [type]: !showNumbers[type] });
  };

  return (
    <footer className="text-gray-600 body-font bg-[#6dbb48]">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <Link to="/">
            <div className="title flex items-center">
              <FaPaw size={35} />
              <span className="ml-3 text-xl">PawDopt</span>
            </div>
          </Link>
        </div>
        <p className="text-md text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 — PawDopt
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-white">
          <a href="#!" className="text-white" onClick={() => handleClick('paypal')}>
            <BsPaypal size={30} />
            {showNumbers.paypal && <span className="ml-1">09168750082</span>}
          </a>
          <a href="#!" className="ml-3 text-white" onClick={() => handleClick('letterG')}>
            <TbSquareRoundedLetterG size={30} />
            {showNumbers.letterG && <span className="ml-1">09168750082</span>}
          </a>
          <a href="#!" className="ml-3 text-white" onClick={() => handleClick('telephone')}>
            <BsFillTelephoneFill size={30} />
            {showNumbers.telephone && <span className="ml-1">0+63-2-8123-4567.</span>}
          </a>
          <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="ml-3 text-white">
            <AiFillMail size={30} /> 
          </a>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="ml-3 text-white">
            <CiLocationOn size={30} />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
