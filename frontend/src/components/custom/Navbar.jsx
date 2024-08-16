import React from "react";
import { Link, Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useSelector } from "react-redux";
import UserMenuItems from "./UserMenuItems";

const Navbar = () => {
  const {user} = useSelector((state) => state.userReducer);
  return (
    <>
      <div className="fixed shadow-lg shadow-white-10 w-full z-10 bg-slate-100 top-0 lg:flex lg:justify-between items-center
       dark:bg-slate-900 dark:text-slate-400 dark:shadow-md dark:shadow-slate-800 pt-3 pb-3 pl-10 pr-10">
        <div>
          {/* Logo */}
          <div className="font-bold text-3xl text-center 
            tablloet:text-lg lg:text-3xl xl:text-4xl">
            <i className="fa-solid fa-baht-sign fixed left-0 ml-1 lg:invisible"></i>
            <Link to="/" className="linkStyle">
              {" "}
              Musicer{" "}
            </Link>
          </div>
        </div>

        <div className="flex items-center">
            <span className="text-2xl lg:text-base xl:text-2xl mr-5 pt-1">
              {" "}
              <ThemeSwitch />{" "}
            </span>
            {user?<UserMenuItems /> :null}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
