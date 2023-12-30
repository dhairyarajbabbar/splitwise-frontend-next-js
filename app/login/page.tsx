import React, { useState } from 'react';
import LoginClientSide from '../../components/loginClientSide';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const LoginPage: React.FC = () => {
  const cookieStore = cookies();
  if(cookieStore.has('accessToken')){
    redirect("/$/dashboard");
  }
  return (
    <div>
      <LoginClientSide/>
    </div>
  );
};

export default LoginPage;
