import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPaw } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      const { token, role, id } = response.data;

      // Fetch verification status after successful login
      const verificationResponse = await axios.get(
        `http://localhost:8000/api/check-verification/${id}`
      );
      const { verified } = verificationResponse.data;

      // Store user information in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("id", id);
      localStorage.setItem("verified", verified);
      window.localStorage.setItem("isLoggedin", true); 
      

      // Redirect based on user role
      if (role === "admin") {
        navigate("/");
        toast.success("Logged in as Admin");
      } else {
        navigate("/");
        toast.success("Successfully logged in");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      toast.error("Incorrect Email or Password");
      // Handle login failure, show error message, etc.
    }
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
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Welcome</h1>
                <p>Enter your information to login</p>
              </div>
              <div>
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
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                        
                      />
                    </div>
                  </div>
                </div>
                {/* Password */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label htmlFor className="text-xs font-semibold px-1">
                      Password
                    </label>
                    
                    <div className="flex">
                      
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#6dbb48]"
                      />
                    </div>
                    <div className="text-sm py-2 px-1">
                <Link
                  to="/send-otp"
                  className="font-semibold text-[#6dbb48] hover:text-[#77df47]"
                >
                  Forgot password?
                </Link>
              </div>

                  </div>
                  
                </div>
                {/* Button */}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      type="submit"
                      className="block w-full max-w-xs mx-auto bg-[#6dbb48] hover:bg-[#84dd5a] focus:bg-[#6dbb48] text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Login
                    </button>
                  </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold leading-6 text-[#6dbb48] hover:text-[#77df47]"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
