import React from "react";
import SideBar from "./SideBar";

function GreetingCard() {
  return (
    <div className="flex gap-5 w-full h-[20rem]">
      <div className="card rounded-md h-1/2 w-2/3 shadow-xl bg-accent/10 items-start">
        <h1 className="text-xl font-bold text-start px-3 py-2">
          Welcome to the ChatApp!
        </h1>
        <div className="divider"></div>
        <p className="px-3">You can create or join a room from the sidebar</p>
      </div>
    </div>
  );
}

export default GreetingCard;
