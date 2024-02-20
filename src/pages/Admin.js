import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function Admin() {
  const [name,setName] = useState('');
  const [author,setAuthor] = useState('');
  const [subject,setSubject] = useState('');
  const [date,setDate] = useState('');
  const navigate=useNavigate();
  const [validationMessage,setValidationMessage]=useState(false);

    const add = (e) => {
      e.preventDefault(); 
      if (!name || !subject || !author || !date) {
        setValidationMessage("Please fill in all details");
        return;
      }
      Axios.post(`http://localhost:3080/add`, {
        name:name,
        author:author,
        subject:subject,
        date:date
      })
        .then(() => {
          console.log("Success");
          navigate('/adminpannel')
        })
        .catch(() => {
          console.error();
        });
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
        <div class="border-b border-gray-900/10 p-5 flex justify-center items-center">
        <form>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-24">
                <div class="sm:col-span-12">
                  <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Book Name</label>
                  <div class="mt-2">
                  <input type="text" onChange={(e)=>{setName(e.target.value);}} name="first-name" id="first-name" maxLength={30} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
                </div>
  
                <div class="sm:col-span-12">
                  <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Author</label>
                  <div class="mt-2">
                  <input type="text" onChange={(e)=>{setAuthor(e.target.value);}} name="first-name" id="first-name" maxLength={20} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
                </div>
              <div class="sm:col-span-12">
                  <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Subject</label>
                  <div class="mt-2">
                  <input type="text" onChange={(e)=>{setSubject(e.target.value);}} name="first-name" id="first-name" maxLength={20} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
              <div class="sm:col-span-6">
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Date</label>
                  <div class="mt-2">
                  <input id="date" name="date" type="date" onChange={(e)=>{setDate(e.target.value);}} class="input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
              <div className='mt-24'>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="error" onClick={add}>
                  Add
                </Button>
              </Stack>
              </div>
            </div>
        </form>
        </div>
    </div>
    )
  }
