import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPaw } from "react-icons/fa";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactinfo, setContactinfo] = useState("");
  const [address, setAddress] = useState("");



  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        firstname,
        lastname,
        email,
        password,
        contactinfo,
        address
      });
      if (response.status === 200) {
        console.log(handleSubmit);
        navigate("/login");
        toast.success("Account successfully created");
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Signup error:", error.response.error);
    }
  };


  const validatePassword = () => {
    const hasSpecialChar = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLength = password.length >= 8;

    return {
      hasSpecialChar,
      hasNumber,
      hasLowercase,
      hasUppercase,
      hasLength,
    };
  };

  const getPasswordValidationIcon = (isValid) => {
    return isValid ? (
      <span className="text-green-500">&#10003;</span>
    ) : (
      <span className="text-red-500">&#10060;</span>
    );
  };
  

  return (
    <div>
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: 1000 }}
        >
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-[#6dbb48] py-10 px-10">
            <FaPaw className="w-full h-full text-white"/>
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Register</h1>
                <p>Enter your information to register</p>
              </div>
              <div>
                <div className="flex -mx-3">
                  {/* First Name */}
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor className="text-xs font-semibold px-1">
                      First name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="fistname"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                  {/* Last Name */}
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Last name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                {/* Contact Info */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Contact Number
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Contact Number"
                        name="contactinfo"
                        onChange={(e) => setContactinfo(e.target.value)}
                        value={contactinfo}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                {/* Address */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Address
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                {/* Password */}
                <div className="flex -mx-3 relative mb-12">
                  <div className="w-full px-3">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex relative">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="password"
                        placeholder="***********"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                      <div className="absolute top-0 right-0 mt-1 mr-3 cursor-pointer">  
                      <i id="showPasswordIcon" class="mdi mdi-eye-outline text-gray-400 text-lg"></i>
                      </div>
                      {isPasswordFocused && (
                        <div className="absolute top-full left-0 mt-1 p-1.5 bg-white border border-gray-300 rounded shadow-md z-10">
                          {/* Password Validation Icons */}
                          {getPasswordValidationIcon(
                            validatePassword().hasSpecialChar
                          )}{" "}
                          Special Character <br />
                          {getPasswordValidationIcon(validatePassword().hasNumber)} At
                  least 1 Number<br />
                  {getPasswordValidationIcon(
                    validatePassword().hasLowercase
                  )}{" "}
                  Small Caps<br />
                  {getPasswordValidationIcon(
                    validatePassword().hasUppercase
                  )}{" "}
                  Big Caps<br />
                  {getPasswordValidationIcon(validatePassword().hasLength)} At
                  least 8 Characters                          
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      onClick={handleSubmit}
                      className="block w-full max-w-xs mx-auto bg-[#6dbb48] hover:bg-[#84dd5a] focus:bg-[#6dbb48] text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Register
                    </button>
                  </div>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Already a member?{" "}
                  <Link
                    to="/login"
                    className="font-semibold leading-6 text-[#6dbb48] hover:text-[#77df47]"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
