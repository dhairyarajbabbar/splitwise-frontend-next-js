// app/dashboard/layout.tsx
// 'use client'
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
        {/* <div className="h-screen">
          <div className="pt-5 flex flex-col gap-5 px-3">
            <li>
              <Link href="/dashboard/groups"> groups</Link>
            </li>
            <div>
              <Groupcomponent />
            </div>
            <li>
              <Link href="/dashboard/friends"> friends</Link>
            </li>
            <div>
              <FriendsComp />
            </div>
          </div>
        </div> */}
        <div className="p-4">{children}</div>
      </div>
  );
}
