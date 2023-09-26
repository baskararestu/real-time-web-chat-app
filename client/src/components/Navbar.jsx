import React from "react";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_data");
    alert("Succesfully Logout");
    window.location.href = "/login";
  };

  return (
    <div className="navbar bg-gray-400/60">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Chat App</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://intentplanning.ca/wp-content/uploads/2019/01/sample-person.jpg"
                alt="User Avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
