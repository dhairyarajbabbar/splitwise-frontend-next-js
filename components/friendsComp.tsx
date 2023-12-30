// Friendcomponent.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from 'react';

const url = `https://splitwise-lvh3.onrender.com/api/user/friend`;

async function getData() {
  try {
    const cookieStore = cookies();
    const cook = cookieStore.get('accessToken');
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        Cookie: `accessToken=${cook?.value}`,
      },
      mode:'cors'
    });
    if (!res.ok) {
      redirect("/login");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
// async function checklogin() {

// }

export default async function Friendcomponent() {
  // const temp=await checklogin();
  const data = await getData();
  const friendlist = data.friends;

  return (
    <div className="py-3 overflow-y-auto max-h-40 no-scrollbar"> {/* max-h-40 sets the maximum height for the list, scrollbar-hidden hides the scrollbar */}
      <ul>
        {friendlist.map((item: { _id: string; name: string; amount: number }) => (
          <li key={item._id} className="mb-2">
            <a href={`/$/friend/${item._id}`} className="text-blue-500 hover:underline">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
