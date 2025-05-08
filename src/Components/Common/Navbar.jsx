import React from "react";
import { FaBolt, FaFireAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import userImg from "../../Assets/userTwo.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout, loading, userBalance } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: err.message || "Could not log out at this time.",
        });
      });
  };

  const handleAvatarClick = () => {
    Swal.fire({
      title: "Please Log In",
      text: "You need to be logged in to view your profile and settings.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log In",
      allowOutsideClick: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/auth/login");
      }
    });
  };

  const links = (
    <>
      <>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bills"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : ""
            }
          >
            Bills
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      </>
    </>
  );

  return (
    <div>
      <div className="navbar shadow-sm lg:px-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* Mobile menu items */}
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow flex flex-col gap-2 text-xl"
            >
              {links}
            </ul>
          </div>
          {/* Brand Logo */}
          <div>
            <Link to="/">
              <a className="btn bg-transparent border-none text-2xl font-bold flex items-center gap-2">
                <FaFireAlt className="text-red-500 text-2xl animate-pulse" />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  BillEase
                </span>
              </a>
            </Link>
          </div>
        </div>

        {/* Desktop menu items */}
        <div className="navbar-center hidden lg:flex lg:ml-10">
          <ul className="menu menu-horizontal px-1 flex gap-10 text-lg">
            {links}
          </ul>
        </div>

        {/* Dynamic Part (Login/Logout/Pfp)Render based on loading state */}
        <div className="navbar-end">
          {loading ? (
            <div className="pr-2 flex items-center">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          ) : (
            <>
              {/* Login/Logout Button */}
              <div className="pr-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="btn text-lg bg-transparent"
                  >
                    LogOut
                  </button>
                ) : (
                  <Link to="/auth/login">
                    <a className="btn text-lg bg-transparent">Login</a>
                  </Link>
                )}
              </div>
              <div className="dropdown dropdown-end">
                {user ? (
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar w-10 lg:w-12"
                  >
                    <div className="rounded-full w-10">
                      <img src={user.photoURL || userImg} alt="User Avatar" />
                    </div>
                  </div>
                ) : (
                  <div
                    role="button"
                    className="btn btn-ghost btn-circle avatar w-10 lg:w-12"
                    onClick={handleAvatarClick}
                  >
                    <div className="rounded-full w-10">
                      <img src={userImg} alt="Default User Avatar" />
                    </div>
                  </div>
                )}

                {user && (
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 z-[100] p-2 shadow bg-base-200 rounded-box w-64"
                  >
                    {/* User Name */}
                    <li className="px-4 pt-2 pb-1">
                      <span className="font-bold text-lg block">
                        {user.displayName || "User Name"}
                      </span>
                    </li>
                    {/* User Email */}
                    <li className="px-4 pb-2">
                      <span className="text-xs text-gray-500 block">
                        {user.email || "user@example.com"}
                      </span>
                    </li>
                    {/* Divider */}
                    <li>
                      <div className="divider my-0 mx-2"></div>
                    </li>
                    {/* Balance */}
                    <li className="px-4 py-1">
                      <span className="text-sm">
                        Balance:{" "}
                        <span className="font-semibold">
                          {userBalance.toLocaleString()} BDT
                        </span>
                      </span>
                    </li>
                    {/* Divider */}
                    <li>
                      <div className="divider my-0 mx-2"></div>
                    </li>
                    {/* Profile Link */}
                    <li>
                      <Link to="/profile" className="py-2 mx-2">
                        Profile
                      </Link>
                    </li>
                    {/* Divider */}
                    <li>
                      <div className="divider my-0 mx-2"></div>
                    </li>
                    {/* Dashboard Link */}
                    <li>
                      <Link to="/dashboard" className="py-2 mx-2">
                        Dashboard
                      </Link>
                    </li>
                    {/* Divider */}
                    <li>
                      <div className="divider my-0 mx-2"></div>
                    </li>
                    {/* Log Out Button */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-ghost text-red-500 w-full justify-start hover:bg-red-100 py-2 mx-2 text-sm"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
