// WholePageLayout.jsx
import FriendsComp from '../../components/friendsComp';
import Groupcomponent from '../../components/groupsComp';
import Link from 'next/link';
import React from 'react';
import AddGroupBtn from '../../components/addGroupBtn';
import AddFriendBtn from '../../components/addFriendBtn';
import LogOutBtn from '../../components/LogOutBtn';

export default function WholePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-y-auto  no-scrollbar">
      {/* Left Sidebar */}
      <div className="h-full w-1/5 p-5 bg-gray-800 border-r border-gray-700">
        <div className="py-5 font-bold pr-2 text-lg font-bold hover:underline">
          <Link href="/$/dashboard">Dashboard</Link>
        </div>
        {/* Groups Section */}
        <div className="flex items-center border-b border-gray-700 mb-4 pb-4">
          <div className="font-bold pr-2">Groups</div>
          <div className="ml-auto">
            <AddGroupBtn />
          </div>
        </div>
        <div className="mb-4">
          <Groupcomponent />
        </div>
        {/* Friends Section */}
        <div className="flex items-center border-b border-gray-700 mb-4 pb-4">
          <div className="font-bold pr-2">Friends</div>
          <div className="ml-auto">
            <AddFriendBtn />
          </div>
        </div>
        <div>
          <FriendsComp />
        </div>
        <div className="">
            <LogOutBtn />
        </div>
      </div>
      {/* Main Content */}
      <div className="p-4 flex-grow">{children}</div>
    </div>
  );
}
