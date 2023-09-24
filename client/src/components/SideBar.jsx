import React from "react";
import ModalCreateRoom from "./ModalCreateRoom";

function SideBar({ children }) {
  return (
    <div className="w-1/3 h-full flex flex-col justify-start items-start px-3">
      <div>
        <button
          className="btn btn-accent rounded-md w-[10rem]"
          onClick={() => document.getElementById("create_room").showModal()}
        >
          Create a room
        </button>
      </div>
      {children}
      <ModalCreateRoom />
    </div>
  );
}

export default SideBar;
