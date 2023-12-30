// app/dashboard/page.tsx
// 'use client'
// import { useRouter } from 'next/navigation';
// import React from 'react';
// // import { useSelector } from 'react-redux';
// const DashboardPage: React.FC = () => {
//   // const user = useSelector((state: any) => state.auth.user);
//   // const router=useRouter();
//   // if(!user?.email) {
//   //   router.push('login');
//   // }
//   return (
//     <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-black">Dashboard</h1>
//     </div>
//   );
// };

export default () => {
  return (
    <div className="w-full mx-auto mt-16 p-6 bg-gray-950 shadow-lg rounded-md border border-gray-700">
      <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>
      <h1 className="text-2xl font-bold mb-4 text-white">Ab to Paise Dede Sabke 😂</h1>
    </div>
  );
}


// export default DashboardPage;

//{user && <p className="text-gray-700">Welcome, {user?.email}!</p>}