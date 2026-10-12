import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="w-full bg-primary sticky top-0 z-50">
      <div className="navbar bg-primary shadow-sm rounded-xl p-2">
        <div className="flex-1">
          <Link to="/">
            <h1 className="text-base-100 text-xl font-bold pl-2 cursor-pointer">
              SKILLMATRIX
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <input
            type="text"
            placeholder="Search"
            className="input w-30 h-8 md:w-72  bg-base-100 text-primary outline-none focus:border-secondary placeholder:text-primary focus:placeholder:text-gray-500 rounded-lg"
          />

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle ml-3 avatar placeholder bg-base-100 text-primary hover:bg-secondary"
              >
                <div className="rounded-full w-4 flex items-center justify-center font-bold text-lg">
                  {user.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <User className="w-4 h-4 " />
                  )}
                </div>
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-3 shadow-xl bg-base-100 text-primary rounded-xl w-60 mt-3 border border-base-200 space-y-1"
              >
                {/* User Details */}
                <li className="px-2 py-2 border-b border-base-200">
                  <div className="flex flex-col p-3">
                    <span className="font-bold text-base text-primary">
                      {user.name || "User"}
                    </span>
                    <span className="text-xs text-gray-500 font-normal truncate max-w-full">
                      {user.email}
                    </span>
                    <span className="badge badge-primary badge-sm text-[10px] uppercase font-bold mt-1">
                      {user.role || "Student"}
                    </span>
                  </div>
                </li>

                {/* Dropdown Options */}
                {user.role === "instructor" ? (
                  <li>
                    <Link
                      to="/instructor/dashboard"
                      className="flex items-center gap-2 py-2 hover:bg-secondary rounded-md"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/my-learning"
                      className="flex items-center gap-2 py-2 hover:bg-secondary rounded-md"
                    >
                      <BookOpen className="w-4 h-4" />
                      My Learning
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 py-2 hover:bg-secondary rounded-md"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-1 text-error hover:bg-red-500 hover:text-base-100 rounded-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* Login & Register Buttons when user is not logged in */
            <div className="flex items-center gap-2 ml-2">
              <Link
                to="/login"
                className="btn btn-md bg-base-100 text-primary hover:bg-secondary border-none shadow-none font-semibold rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-md bg-accent text-base-100 hover:bg-secondary hover:text-primary border-none shadow-none font-semibold rounded-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;