'use client'
import { userSession } from '@/types';
import { redirect } from 'next/navigation';
import {useEffect, useState} from 'react';

const Dashboard = () => {
  const [userSession, setUserSession] = useState<userSession>();

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem('userSession');
      setUserSession(JSON.parse(userToken!))
      !userToken && redirect("/login")
    }
  }, [])

  return (
    <div className='w-full h-screen'>
      <h1> Bienvenido {userSession?.userData.name}</h1>
      <p>Tu dirección: {userSession?.userData.address}</p>
    </div>
  )
}

export default Dashboard