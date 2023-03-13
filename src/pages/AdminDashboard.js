import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <Link>
        <button className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          add movie
        </button>
      </Link>
      <Link
        to="/theater"
        className="m-3 bg-transparent border border-indigo-500 hover:bg-indigo-700 text-black font-bold py-2 px-4 rounded"
      >
        <button>add theater</button>
      </Link>
    </div>
  );
}
