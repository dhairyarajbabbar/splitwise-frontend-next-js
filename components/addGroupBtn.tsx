// AddGroupBtn.jsx
'use client'
import { useState } from "react"
import AddGroupPromt from "./addGroupPromt";

export default function AddGroupBtn() {
  const [addGroupcomponent, setaddGroupcomponent] = useState(false);

  const handleButtonClick = () => {
    setaddGroupcomponent(!addGroupcomponent);
  };

  return (
    <div className="ml-auto">
      <button
        className="px-2 py-1 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleButtonClick}
      >
        Add Group
      </button>
      {addGroupcomponent && <AddGroupPromt onClickHandler={handleButtonClick}/>}
    </div>
  );
}
