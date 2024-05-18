
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';


const AddBooks = () => {

  const [book,setBook] = useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  });

  const navigate = useNavigate();
  

  const handleChange = async e =>{
    setBook(prev=>({...prev , [e.target.name]: e.target.value}))
  };
  const handleClick = async e =>{
      e.preventDefault()
      try{
        await axios.post("http://localhost:8800/books",book)
        navigate("/book");
      }catch(err){
          console.log(err);
      }
    }
  
  
  console.log(book)
  return (
    <div>
      <Navigation/>
    <div className='forms'>
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" name="title" onChange={handleChange} placeholder='title' />
      <input type="text" name="desc" onChange={handleChange} placeholder='author' />
      <input type="number" name="price" onChange={handleChange} placeholder='price' />
      <input type="text" name="cover" onChange={handleChange} placeholder='cover' />
      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
    </div>
    </div>
  );
};

export default AddBooks
