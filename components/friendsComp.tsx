import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from 'react';

const url = `https://splitwise-lvh3.onrender.com/api/user/friend`;

async function getData() {
  try {
    const cookieStore = cookies();
    const cook = cookieStore.get('accessToken');

    // if (!accessToken) {
    //   redirect("/login");
    // }

    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      // credentials: 'include',
      headers: {
        Cookie: `accessToken=${cook?.value}`,
      },
      mode: 'cors',
    });

    if (!res.ok) {
      // Handle API error, redirect or throw an error
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to indicate that the data fetch failed
  }
}

export default async function Friendcomponent() {
  try {
    const data = await getData();
    const friendlist = data.friends || [];

    return (
      <div className="py-3 overflow-y-auto max-h-40 no-scrollbar">
        <ul>
          {friendlist.map((item:any) => (
            <li key={item._id} className="mb-2">
              <a href={`/$/friend/${item._id}`} className="text-blue-500 hover:underline">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    // Handle the error, you can render an error message or log it
    console.error("Error rendering Friendcomponent:", error);
    return null; // Or return an error message or fallback UI
  }
}
