import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Adminpannel() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3080/book`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2 className='text-3xl font-bold flex justify-center mt-12'>Admin Panel</h2>
      <div className='bg-red-500 p-24 mt-12'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 30 }}>Name</TableCell>
              <TableCell sx={{ fontSize: 30 }} align="center">Author</TableCell>
              <TableCell sx={{ fontSize: 30 }} align="center">Subject</TableCell>
              <TableCell sx={{ fontSize: 30 }} align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell sx={{ fontSize: 18 }} component="th" scope="row">
                  {book.name}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="center">{book.author}</TableCell>
                <TableCell sx={{ fontSize: 18 }} align="center">{book.subject}</TableCell>
                <TableCell sx={{ fontSize: 18 }} align="center">{book.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};
