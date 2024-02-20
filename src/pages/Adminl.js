import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function Adminl() {
  const [adminname, setAdminname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ adminname, password });
    try {
      const response = await axios.post('http://localhost:3080/alogin', {
        adminname: adminname,
        password: password,
      });
      if (!response.data.auth) {
        setLoginStatus(false);
        setShowPopup(true);
      } else {
        setLoginStatus(true);
        const { token, result } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(result));
        navigate('/admin');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error.message);
      setShowPopup(true);
    }
  };

  const userauth = () => {
    axios
      .get('http://localhost:3080/isAuth', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('An unexpected error occurred:', error.message);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div>
      <div className='flex justify-center text-3xl translate-y-32 font-bold'>
        <p>Admin Login</p>
      </div>
      <div>
    </div>
    <div className='flex justify-end -ml-2'>
          {showPopup && (
            <Stack>
              <Alert severity="warning" onClose={() => setShowPopup(false)}>
                Error Invalid Credentials Check username and Password
              </Alert>
            </Stack>
          )}
        </div>
      <div className='flex justify-center items-center mt-60'>
        <div className='for w-96 h-96 flex flex-col justify-center items-center bg-black rounded-2xl'>
          <form>
            <div className='flex justify-center'>
              <TextField
                type='text'
                required
                error
                id="standard-required"
                label="Admin name"
                variant="standard"
                onChange={(e) => setAdminname(e.target.value)}
                InputProps={{
                  style: { color: 'white' }
                }}
              />
            </div>
            <div className='flex justify-center mt-10'>
              <TextField
                required
                error
                id="standard-password-input"
                label="Password"
                autoComplete="current-password"
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: { color: 'white' }
                }}
              />
            </div>
            <button
              type='button'
              className='font-semibold -translate-y-10 translate-x-44 text-white'
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            <hr className='border-t border-transparent'></hr>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='text-white font-bold text-xl h-12 w-20 rounded-lg bg-red-500 hover:bg-red-400 hover:text-black'
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <p className='con text-white flex justify-center mt-5 gap-2 text-xl mb-2'>
              New user??<Link to='/adminsignup' className='text-sky-400'>
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
      {loginStatus && <button onClick={userauth}>Check</button>}
    </div>
    </Box>
  );
}