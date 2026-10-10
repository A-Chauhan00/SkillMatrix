// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { Eye,EyeOff } from 'lucide-react';

// const Register = () => {

//     const navigate = useNavigate();

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const [showPassword, setShowPassword] = useState(false);

   

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         if (!name.trim()) {
//     setError("Please enter your name.");
//     return;
// }
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!emailRegex.test(email.trim())) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//          if (password.length < 8) {
//                    setError("Password must be at least 8 characters long.");
//                    return;
//                }

//         setError("");
//         setLoading(true);
      
//         //    try {
//         // const data = await register(
//         //     name.trim(),
//         //     email.trim().toLowerCase(),
//         //     password
//         // );

//         //     if (data.success) {
//         //         navigate("/");
//         //     } else {
//         //         setError(data.message);
//         //     }

//         // } catch (error) {
//         //     console.error("Registration error:", error);

//         //     setError(
//         //         error.response?.data?.message ||
//         //         "Registration failed. Please try again"
//         //     );

//         // } finally {
//         //     setLoading(false);
//         // }
//     };


// return (
//   <div className=" min-h-screen flex items-center justify-center bg-primary p-4">
//     <form
//       className=" flex flex-col items-center max-w-md w-full p-8 rounded-2xl bg-base-100 shadow-xl border border-base-200"
//       onSubmit={handleRegister}
//       noValidate
//     >
//       <h1 className="text-4xl font-bold text-primary mb-6">Register</h1>

//       {/* Name Field */}
//       <div className=" w-full mb-4">
//         <label className="label text-sm font-medium mb-1 block text-base-content">
//           Name
//         </label>
//         <input
//           type="text"
//           placeholder="full name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="input outline-none focus:border-primary w-full"
//         />
//       </div>

//       {/* Email Field */}
//       <div className=" w-full mb-4">
//         <label className="label text-sm font-medium mb-1 block text-base-content">
//           Email
//         </label>
//         <input
//           type="email"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="input outline-none focus:border-primary w-full"
//         />
//       </div>

//       {/* Password Field with Eye Toggle */}
//       <div className="w-full mb-4">
//         <label className="label text-sm font-medium mb-1 block text-base-content">
//           Password
//         </label>
//         <div className="relative w-full">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="input outline-none focus:border-primary w-full pr-10"
//           />

//           {/* password toggle button */}
//           <button
//             type="button"
//             className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors p-1"
//             onClick={() => setShowPassword((prev) => !prev)}
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <p className=" my-2 text-sm text-center text-[#ff4d4d] font-semibold w-full">
//           {error}
//         </p>
//       )}

//       {/* Submit Button */}
//       <button
//         className="btn btn-primary w-full text-base-100 mt-4 mb-4 hover:bg-secondary hover:text-primary"
//         type="submit"
//         disabled={loading}
//       >
//         {loading ? (
//           <>
//             <span className="loading loading-spinner loading-xs"></span>
//             Registering...
//           </>
//         ) : (
//           "Register"
//         )}
//       </button>

//       {/* Redirect Link */}
//       <p className="text-sm text-gray-600">
//         Already have an account?{" "}
//         <Link to="/login" className="text-primary font-semibold hover:underline ml-1">
//           Login
//         </Link>
//       </p>
//     </form>
//   </div>
// );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = useAuthStore((state) => state.register); // 👈 Zustand register action
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      const response = await register({ name, email, password });

      if (response?.success) {
        // User is auto-logged in, navigate directly to home page
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container min-h-screen flex items-center justify-center bg-primary p-4">
      <form
        className="register-form flex flex-col items-center max-w-md w-full p-8 rounded-2xl bg-base-100 shadow-xl border border-base-200"
        onSubmit={handleRegister}
        noValidate
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Register</h1>

        {/* Name Field */}
        <div className="register-fields w-full mb-4">
          <label className="label text-sm font-medium mb-1 block text-base-content">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input outline-none focus:border-primary w-full"
          />
        </div>

        {/* Email Field */}
        <div className="register-fields w-full mb-4">
          <label className="label text-sm font-medium mb-1 block text-base-content">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input outline-none focus:border-primary w-full"
          />
        </div>

        {/* Password Field */}
        <div className="register-fields password-field w-full mb-4">
          <label className="label text-sm font-medium mb-1 block text-base-content">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input outline-none focus:border-primary w-full pr-10"
            />
            <button
              type="button"
              className="password-toggle absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors p-1"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className=" my-2 text-sm text-center text-red-600 font-medium w-full">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          className="register-button btn btn-primary w-full text-base-100 hover:bg-secondary hover:text-primary mt-4 mb-4"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Creating Account...
            </>
          ) : (
            "Register"
          )}
        </button>

        {/* Redirect Link */}
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;