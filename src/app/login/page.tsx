"use client";
import axios  from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",

  })

  const [buttonDisabled, setButtonDisabled] =
    React.useState(false);

  const [loading, setLoading] = React.useState(false);



  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success"); 
      router.push("/profile");
      
    } catch (error:any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  
  }
  
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

  }, [user]);



  return (
    <>
      <div className='flex flex-col items-center min-h-screen justify-center bg-white ' >
        <div className='wrapper flex flex-col items-center font-sans text-black border border-gray-600 rounded-lg px-16 py-10 bg-white'>
          <h1 className='text-4xl text-black '>{loading ? "Processing" : "Login"}</h1>

          <hr className='border w-[12rem] my-4' />



          <div className='form-wrapper flex flex-col gap-2'>
            <label className='capitalize' htmlFor="email">email</label>
            <input className='p-2 border border-gray-400 rounded-lg mb-4 
       focus:outline-none focus:border-gray-600 'id="email" type="text" placeholder="email"
              value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>


          <div className='form-wrapper flex flex-col gap-2'>
            <label className='capitalize' htmlFor="password">password</label>
            <input className='p-2 border border-gray-400 rounded-lg mb-4 
        focus:outline-none focus:border-gray-600 'id="password" type="password" placeholder="password"
              value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>

          <div className='w-full'>
            <button onClick={onLogin} className='p-3  w-full border-2 border-gray-300 rounded-lg mb-4 
    focus:outline-none focus:border-gray-600  bg-blue-500 text-[#fff]'>{buttonDisabled ? "No login" : "login"}</button>
          </div>
          <Link className='flex justify-center' href='/signup'> Visit the Signup Page</Link>

        </div>



      </div>

    </>

  )
}

export default Login