// Groupcomponent.jsx
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from 'next/navigation';
import React from 'react';

const url = `https://splitwise-lvh3.onrender.com/api/user/group`;

async function getData() {
  const cookieStore = cookies();
  const cook = cookieStore.get('accessToken');
  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      cookie: `accessToken=${cook?.value}`,
    },
    mode: 'cors',
  });
  if (!res.ok) {
    redirect("/login");
  }
  return res.json();
}

export default async function Groupcomponent() {
  const data = await getData();
  const grouplist = data.groups;

  return (
    <div className="py-2">
      <div className="overflow-y-auto max-h-40 no-scrollbar"> {/* max-h-40 sets the maximum height for the list, scrollbar-hidden hides the scrollbar */}
        <ul>
          {grouplist.map((item: { _id: string; name: string }) => (
            <li key={item._id} className="mb-2">
              <Link href={`/$/group/${item._id}`} className="text-purple-500 hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
