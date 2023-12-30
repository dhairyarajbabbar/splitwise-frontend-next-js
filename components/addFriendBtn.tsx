// AddFriendBtn.jsx
'use client'
import { useState } from "react"
import AddFriendPromt from "./AddFriendPromt";

export default function AddFriendBtn() {
  const [addFriendcomponent, setAddFriendcomponent] = useState(false);

  const handleButtonClick = () => {
    setAddFriendcomponent(!addFriendcomponent);
  };

  return (
    <div>
      <button
        className="px-2 py-1 bg-purple-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleButtonClick}
      >
        Add Friend
      </button>
      {addFriendcomponent && <AddFriendPromt onClickHandler={handleButtonClick}/>}
    </div>
  );
}
