// AddExpensePromt.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { addExpense } from '../app/serverActions';
// import { revalidatePath } from 'next/cache';
interface AddExpensePromtProps {
  onClickHandler: () => void;
}
interface Participant {
  user: string;
  toUsers: string[];
  _id: string;
}
const AddExpensePromt: React.FC<AddExpensePromtProps> = ({ onClickHandler }) => {
  const router = useRouter();
  const pathname = usePathname();
  const lastPart = pathname ? pathname.split('/').pop()! : 'helper';
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState("");

  // const addExpense = async () => {
  //   const apiUrl = `https://splitwise-lvh3.onrender.com/api/groupexpense`;
  //   const formData = new URLSearchParams();
  //   formData.append('amount', amount);
  //   formData.append('description', description);
  //   formData.append('groupId', lastPart || "none");

  //   let participants = await findParticipants(lastPart);
  //   participants = participants.group.members;
  //   let userList: string[] = participants.map((participant: Participant) => participant.user);
  //   let userList1 = JSON.stringify(userList);
  //   formData.append('participants', userList1);
  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       mode: 'cors',
  //       body: formData,
  //     });
  //   } catch (error) {
  //     console.error('Error creating group:', error);
  //   }
  //   onClickHandler();
  //   router.refresh();
  // }

  const addExpensehandler = async () => {
    onClickHandler();
    addExpense(amount, description, lastPart);
  }
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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="modal-overlay modal-content bg-gray-900 p-8 rounded-lg w-2/3 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border-4 border-gray-950 ">
        <div className="bg-slate-950 flex justify-between items-center mb-4 border-solid border-2 border-gray-950 rounded-lg p-3">
          <h2 className="text-2xl font-bold text-white">Add an expense</h2>
          <button onClick={onClickHandler} className="text-3xl font-bold text-white border-none bg-slate-950">
            ×
          </button>
        </div>
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setdescription(e.target.value)}
          className="mb-4 p-3 border border-gray-950 rounded-md w-full bg-gray-800 text-white"
        />
        <input
          type="number"
          value={amount}
          placeholder="0.00"
          onChange={(e) => setamount(e.target.value)}
          className="mb-4 p-3 border border-gray-950 rounded-md w-full bg-gray-800 text-white"
        />
        <div className="includeInfo flex items-center space-x-2 mb-4">
          <h2 className="text-white">Paid by</h2>
          <button className=" p-2 bg-slate-950 border border-gray-700  rounded-md">you</button>
          <h2 className="text-white">and Split</h2>
          <button className="p-2 bg-slate-950 border border-gray-700 rounded-md">equally</button>
        </div>
        <button
          onClick={addExpensehandler}
          className="px-4 py-2 bg-slate-950 border border-gray-700 text-white rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddExpensePromt;
