import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserPanel = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3080/book`)
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleFilterChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setFilter(searchTerm);

    const filteredData = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.subject.toLowerCase().includes(searchTerm)
    );

    setFilteredBooks(filteredData);
  };

  return (
    <div>
      <h2 className='font-extrabold text-3xl flex justify-center mt-12'>User Panel</h2>
      <div className='flex justify-center mb-12 mt-12'>
        <TextField
          error
          id="outlined-error"
          label="Search here"
          onChange={handleFilterChange}
        />
      </div>
      <div className='p-24 bg-red-500 flex justify-center'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 30 }}>Name</TableCell>
              <TableCell align="center" sx={{ fontSize: 30 }}>Author</TableCell>
              <TableCell align="center" sx={{ fontSize: 30 }}>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell sx={{ fontSize: 18 }} component="th" scope="row">
                  {book.name}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="center">{book.author}</TableCell>
                <TableCell sx={{ fontSize: 18 }} align="center">{book.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default UserPanel;
