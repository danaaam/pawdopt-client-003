import { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPaw } from "react-icons/fa";
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import Icon from "@mdi/react";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [suffix, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] =useState("");
  const [contactinfo, setContactinfo] = useState("+63 ");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validDocs, setValidDocs] = useState(null); // Renamed state variable
  const fileInputRef = useRef(null); // Ref for file input element
  const [isAgreed, setIsAgreed] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("validDocs", validDocs); // Append validDocs to FormData
  
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("middlename", middlename);
      formData.append("suffix", suffix);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("contactinfo", contactinfo);
      formData.append("currentAddress", currentAddress);
      formData.append("permanentAddress", permanentAddress);
      formData.append("facebook", facebook);
  
      const response = await axios.post("http://localhost:8000/api/register", formData);
  
      console.log("response: ",response)
  
      if (response.status === 200) {
        navigate("/signin");
        toast.success("Account successfully created");
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleContactInfoChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+63")) {
      value = "+63" + value.replace(/^\+/, "");
    }
    setContactinfo(value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setValidDocs(file);
    } else {
      setValidDocs(null);
      toast.error("Please upload a valid JPEG or PNG file.");
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
              <FaPaw className="w-full h-full text-white" />
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
                    <label htmlFor="firstname" className="text-xs font-semibold px-1">
                      First name<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Juan"
                        name="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                  {/* Last Name */}
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor="lastname" className="text-xs font-semibold px-1">
                      Last name<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="dela Cruz"
                        name="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  {/* Middle name */}
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor="middlename" className="text-xs font-semibold px-1">
                      Middle name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="Optional"
                        name="middlename"
                        onChange={(e) => setMiddlename(e.target.value)}
                        value={middlename}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                  {/* Suffix */}
                <div className=" px-3 mb-5">
                  <label htmlFor="suffix" className="text-xs font-semibold px-1">
                    Suffix
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                    </div>
                    {/* Dropdown selection */}
                    <select
                      id="suffix"
                      name="suffix"
                      onChange={(e) => setSuffix(e.target.value)}
                      value={suffix}
                      required
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                    >
                      {/* Placeholder option */}
                      <option value="">Select</option>
                      {/* Options for suffixes */}
                      <option value="Jr.">Jr.</option>
                      <option value="Sr.">Sr.</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>

                </div>
                {/* Email */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="email" className="text-xs font-semibold px-1">
                      Email<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="juandelacruz@gmail.com"
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
                    <label htmlFor="contactInfo" className="text-xs font-semibold px-1">
                      Contact Number<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-phone-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="9000000000"
                        name="contactInfo"
                        onChange={handleContactInfoChange}
                        value={contactinfo}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                {/* Facebook */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="facebook" className="text-xs font-semibold px-1">
                      Facebook Link<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="www.facebook.com/username"
                        name="facebook"
                        onChange={(e) => setFacebook(e.target.value)}
                        value={facebook}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                  </div>
                </div>
                {/* Permanent Address */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="address" className="text-xs font-semibold px-1">
                      Permanent Address<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-home-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="House #/Street, Barangay, Town/City, Province"
                        name="address"
                        onChange={(e) => setPermanentAddress(e.target.value)}
                        value={permanentAddress}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                    {/* Hint text */}
                    <p className="text-sm text-slate-400"><i>*House #/Street, Barangay, Town/City, Province</i></p>
                  </div>
                </div>
                {/* Permanent Address */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="address" className="text-xs font-semibold px-1">
                      Current Address<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-home-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        placeholder="House #/Street, Barangay, Town/City, Province"
                        name="address"
                        onChange={(e) => setCurrentAddress(e.target.value)}
                        value={currentAddress}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                    {/* Hint text */}
                    <p className="text-sm text-slate-400"><i>*House #/Street, Barangay, Town/City, Province</i></p>
                  </div>
                </div>
                {/* Password */}
                <div className="flex -mx-3 relative mb-5">
                  <div className="w-full px-3">
                    <label htmlFor="password" className="text-xs font-semibold px-1">
                      Password<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex relative">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"} // Conditional type based on showPassword state
                        placeholder="***********"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                      <div
                        className="absolute top-0 right-0 mt-1 mr-3 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                      >
                        <Icon path={showPassword ? mdiEyeOffOutline : mdiEyeOutline} size={1} color="gray" />
                      </div>
                      {isPasswordFocused && (
                        <div className="absolute top-full left-0 mt-1 p-1.5 bg-white border border-gray-300 rounded shadow-md z-10">
                          {/* Password Validation Icons */}
                          {getPasswordValidationIcon(validatePassword().hasSpecialChar)} Special Character <br />
                          {getPasswordValidationIcon(validatePassword().hasNumber)} At least 1 Number<br />
                          {getPasswordValidationIcon(validatePassword().hasLowercase)} Small Caps<br />
                          {getPasswordValidationIcon(validatePassword().hasUppercase)} Big Caps<br />
                          {getPasswordValidationIcon(validatePassword().hasLength)} At least 8 Characters
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-400"><i>*8 characters long and must contain at least 1 special character, number, lowercase, and uppercase letter.</i></p>
                  </div>
                </div>
                {/* File Upload */}
                <div className="flex -mx-3 mb-1">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="validDocs" className="text-xs font-semibold px-1">
                      Upload Valid Document<span className="text-red-400 font-extrabold">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-file-upload-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="file"
                        id="validDocs"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png"
                        onChange={handleFileUpload}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                    <p className="text-sm text-slate-400"><i>*Birth certificate, Student ID, National ID, Postal ID, etc.</i></p>
                  </div>
                </div>
                {/* Terms & Conditions Checkbox */}
                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="flex items-center text-xs font-semibold px-1">
                      <input
                        type="checkbox"
                        className="form-checkbox cursor-pointer"
                        checked={isAgreed}
                        onChange={() => setIsAgreed(!isAgreed)}
                      />
                      <span className="ml-2">
                        I agree to the{" "}
                        <a href="/terms" target="_blank" className="text-[#6dbb48] underline text-sm">
                          terms & conditions
                        </a>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                  <button
                    className={`block w-full max-w-xs mx-auto bg-[#6dbb48] hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold ${
                      !isAgreed ? 'cursor-not-allowed' : ''
                    }`}
                    onClick={handleSubmit}
                    disabled={!isAgreed}
                  >
                    Register
                  </button>
                    <p className="text-center mt-4">
                      Already have an account?{" "}
                      <Link to="/signin" className="text-[#6dbb48] hover:underline">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
