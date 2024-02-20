import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='flex justify-center mt-52'>
    <div className='w-96 h-96 bg-black rounded-3xl'>
    <p className='text-white flex justify-center font-black text-5xl mt-14'>Login</p>
        <Link to='/adminlogin'>
            <button className='text-white mr-10 mt-24 ml-24 font-bold text-xl h-12 w-20 rounded-lg bg-red-500 hover:bg-red-400 hover:text-black'>Admin</button>
        </Link>
        <Link to='/userlogin'>
            <button className='text-white font-bold text-xl h-12 w-20 rounded-lg bg-red-500 hover:bg-red-400 hover:text-black'>User</button>
        </Link>
    </div>
    </div>
  )
}
