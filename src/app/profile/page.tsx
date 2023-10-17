import React from 'react'
import Home from '../page'
import Link from 'next/link'

const Profile = () => {
  return (
    <>
      <div className='text-4xl flex flex-col items-center justify-center min-h-screen
      py-2'>
        <h1>Profile</h1>
        <hr className='border w-[12rem] my-4' />
        <p>Profile Page</p>

        <button className='p-2 text-2xl  border-2 border-gray-300 rounded-lg mt-4 
    focus:outline-none focus:border-gray-600  bg-blue-500 text-[#fff]'> <Link href='/'> Back to home page </Link> </button>
      </div>
    </>
  )
}

export default Profile