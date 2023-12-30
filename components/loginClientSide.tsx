'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  interface LoginResponse {
    token: string;
  }
  useEffect(() => {
    const access=Cookies.get('accessToken');
    if(access) router.replace("/$/dashboard");
  }, []);
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    try {
      const response = await fetch(`https://splitwise-lvh3.onrender.com/api/login`, {
      // const response = await fetch(`http://localhost:4000/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        body: formData,
      });
      const data: LoginResponse = await response.json();
      const { token } = data;
      console.log(token);
      if(token)
      Cookies.set('accessToken', token);
      router.replace("/$/dashboard");
    } catch (error) {
      console.error('Login failed:', error);
      // setError('Invalid username or password');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button
            type='submit'
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
