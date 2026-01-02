import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({setQuery}) => {
    const {user, logout} = useAuth()

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      
     
      <div className="text-xl font-semibold tracking-wide">
        <Link to="/" className="hover:text-blue-400 transition">
          NoteApp
        </Link>
      </div>

      
      <input
        type="text"
        className="w-64 bg-gray-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Search notes..."
        onChange={(e) => setQuery(e.target.value)}
      />

      
      <div className="flex items-center">
         {!user? (
            <> 
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-3 text-sm transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-3 text-sm transition"
        >
          Signup
        </Link>
         </>
         )
         :
         (
         <>
         <span className="mr-4 text-sm text-gray-300">
         {user.name}
        </span>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition" onClick={logout}>
          Logout
        </button>
        </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
