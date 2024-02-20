import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default function Home() {
  return (
    <div>Home
        <Link to='/login'>
          <button
            type='submit'
            className='text-white font-bold text-xl h-12 w-20 rounded-lg bg-red-500 hover:bg-red-400 hover:text-black'
          >
            Login
          </button>
        </Link>
    </div>
  )
}
