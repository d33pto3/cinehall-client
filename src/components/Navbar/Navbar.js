import React from "react";
import { Link } from "react-router-dom";
import AuthComp from "./AuthComp";
import { RiSearchLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import DropDownMenu from "./DropDownMenu";

export default function Navbar() {
  const { auth } = useSelector((state) => state);
  const { user } = auth;
  // useEffect(() => {
  //   const { user, token } = JSON.parse(localStorage.getItem("user"));
  //   console.log(user.email, token);
  //   if (user) {
  //     dispatch(loginUser(user.email, user.password));
  //   }
  // }, [dispatch]);

  return (
    <nav className="w-full max-h-30 py-4 bg-slate-800 shadow">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
        <div>
          <Link to="/" className="p-20">
            <span className="text-white text-4xl">CINEHALL</span>
          </Link>
        </div>
        <div className="flex items-center text-lg no-underline text-white pr-6">
          <div className="relative mr-5">
            <input
              type="search"
              className="text-black w-full px-3 py-1.5 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
              placeholder="Search"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <RiSearchLine className="text-gray-400" />
            </div>
          </div>
          <Link className="mr-5">About</Link>
          <Link className="mr-7">Contact</Link>
          {user ? (
            <DropDownMenu user={user} />
          ) : (
            <>
              <AuthComp authType={"Login"} goto={"/login"} />
              <AuthComp authType={"Signup"} goto={"/signup"} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
