import React from 'react'
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Asignup() {

  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [username,setUsername] = useState('');
  const [showPassword,setShowPassword]=useState('');
  const [showConfirmPassword,setShowConfirmPassword]=useState('');
  const navigate = useNavigate();
  const [validationMessage,setValidationMessage]=useState(false);

  const addUser = (e) => {
    e.preventDefault(); 
    if (!username || !password || !cpassword) {
      setValidationMessage("Please fill in all details");
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
      if (!/^[A-Z]/.test(password)) {
        setValidationMessage("Password must start with a capital letter");
        return false;
      }
    
      if (!/\d/.test(password)) {
        setValidationMessage("Password must contain at least one digit");
        return false;
      }

      if (password.length !== 9) {
        setValidationMessage("Password must have a maximum length of 8");
        return false;
      }
    
      if (!/[@#]/.test(password)) {
        setValidationMessage("Password must contain at least one of the special characters @ or # or ^ or * etc");
        return false;
      }
    
      if (!passwordRegex.test(password)) {
        setValidationMessage("Password must have: \n- The first letter as a capital letter\n- At least one digit\n- At least one of the special characters @ or # or ^ or * etc\n- Minimum 8 characters in total");
        return false;
      }
      if (password !== cpassword) {
        setValidationMessage("Password and Confirm Password do not match");
        return;
      }
    Axios.post(`http://localhost:3080/register`, {
      username: username,
      password:password,
      cpassword:cpassword,
    })
      .then(() => {
        console.log("Success");
        navigate('/')

      })
      .catch(() => {
        console.error();
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <div className='flex justify-end mt-8'>
        {validationMessage && (
          <>
            <Stack className='relative'>
              <Alert severity="warning" onClose={() => setValidationMessage("")}>
                {validationMessage}
              </Alert>
            </Stack>
            {window.scrollTo({ top: 0, behavior: 'smooth' })}
          </>
        )}
      </div>
      <div class="border-b border-gray-900/10 p-5 flex justify-center items-center h-full">
      <form>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">User name</label>
            <div class="mt-2">
              <input type="text" onChange={(e)=>{setUsername(e.target.value);}} name="first-name" id="first-name" maxLength={20} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
            </div>
          </div>
        </div>
        <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} autocomplete="email" maxLength={9} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={handleTogglePasswordVisibility}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            <div class="mt-2">
              <input type={showConfirmPassword ? 'text' : 'password'} onChange={(e) => setCpassword(e.target.value)} autocomplete="email" maxLength={9} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={handleToggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        <div className='flex justify-center mt-5'>
          <button className='btn bg-red-500 font-bold text-xl text-white hover:bg-red-400 hover:text-black' type='submit' onClick={addUser}>Submit</button>
        </div>
        
        </form>

        </div>
    </div>
  )
}
