
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useAuthStore((state) => state.login); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    try {
      setIsSubmitting(true);
      const res = await login({ email, password });
      if (res?.success) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <form
        className=" flex flex-col items-center max-w-sm  w-full p-8 rounded-2xl bg-base-100 shadow-xl border border-base-200"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Login</h1>

        <div className="w-full mb-4">
          <label className="label text-sm font-medium mb-1 block text-base-content">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input outline-none focus:border-primary w-full"
            required
          />
        </div>

        <div className="w-full mb-4">
          <label className="label text-sm font-medium mb-1 block text-base-content">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input outline-none focus:border-primary w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary p-1"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="my-2 text-sm text-center text-error font-medium w-full">
            {error}
          </p>
        )}

        <button
          className="btn btn-primary w-full text-base-100 hover:bg-secondary hover:text-primary mt-4 mb-4"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;