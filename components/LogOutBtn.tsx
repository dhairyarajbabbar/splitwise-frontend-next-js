'use client'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
export default function LogOutBtn() {
    const router = useRouter();
    function handleLogOut(){
        // Cookies.set('accessToken', token, { secure: true, expires: 1 });
        Cookies.remove('accessToken');
        router.replace("/login");
    }
    return (
      <div>
        <button
          className="px-2 py-1 bg-purple-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    );
}
