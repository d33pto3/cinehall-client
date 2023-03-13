import React from "react";
import { Link } from "react-router-dom";

export default function AuthComp({ authType, goto }) {
  let style = ``;
  if (authType === "Signup") {
    style =
      "bg-indigo-400 hover:bg-indigo-700 text-white font-semibold py-1 mx-2 px-3 rounded";
  }
  if (authType === "Login") {
    style =
      "bg-transparent hover:bg-teal-500 text-teal-400 font-semibold hover:text-white py-1 px-4 border border-teal-500 hover:border-transparent rounded";
  }

  return (
    <button className={style}>
      <Link to={goto} className="hover:text-gray-200 px-2">
        {authType}
      </Link>
    </button>
  );
}
