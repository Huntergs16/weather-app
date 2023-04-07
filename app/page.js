'use client';
import DayList from './components/DayList'
import geo2zip from "geo2zip";
import { useState, useEffect } from 'react'

export default function Home() {

  const [zipcode, setZipcode] = useState("48823")

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const closestZip = await geo2zip(location);
        console.log(typeof closestZip[0]);
        setZipcode(closestZip[0]);
      }, (error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center font-mono gap-10">
      <div className="flex flex-col justify-center items-center w-full bg-blue-300 p-20 rounded-b-3xl shadow-md shadow-cyan-500/50">
        <p className="text-4xl">Weather Dashboard</p>
        <p className="text-md">by Hunter</p>
      </div>
      <div className='w-full flex justify-center items-center p-8'>
        <DayList />
      </div>
    </div>
  )
}
