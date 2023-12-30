'use client'
import { useState } from "react"
import AddExpensePromt from "./AddExpensePromt";
export default  function AddExpensebutton() {
    const [addExpensecomponent, setaddExpensecomponent]=useState(false);
    function handleButtonClick () {
        setaddExpensecomponent(!addExpensecomponent);
    };
    return (
    <div>
        <button className="px-2 py-1 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600 focus:outline-none focus:ring focus:border-blue-300" onClick={handleButtonClick}>Add Expense</button>
        {addExpensecomponent && <AddExpensePromt onClickHandler={handleButtonClick}/>}
    </div>
  )
}
