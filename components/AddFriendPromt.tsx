// Import necessary modules and types
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addFriend } from '../app/serverActions';

interface AddFriendPromtProps {
  onClickHandler: () => void;
}

const AddFriendPromt: React.FC<AddFriendPromtProps> = ({ onClickHandler }) => {
  const router = useRouter();
  const [friendEmail, setFriendEmail] = useState<string>('');

  const addFriendhandler = async () => {
    onClickHandler();
    await addFriend(friendEmail);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modal = document.querySelector('.modal-content');
      if (modal && !modal.contains(event.target as Node)) {
        onClickHandler();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClickHandler]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="modal-overlay modal-content bg-gray-900 p-8 rounded-lg w-2/3 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border-4 border-gray-950">
        <div className="bg-slate-950 flex justify-between items-center mb-4 border-solid border-2 border-gray-950 rounded-lg p-3">
          <h2 className="text-2xl font-bold text-white">Add a friend</h2>
          <button onClick={onClickHandler} className="text-3xl font-bold text-white border-none bg-slate-950">
            ×
          </button>
        </div>
        <input
          type="text"
          placeholder="Friend's Email"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          className="mb-4 p-3 border border-gray-950 rounded-md w-full bg-gray-800 text-white"
        />
        <button
          onClick={addFriendhandler}
          className="px-4 py-2 bg-slate-950 border border-gray-700 text-white rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddFriendPromt;
