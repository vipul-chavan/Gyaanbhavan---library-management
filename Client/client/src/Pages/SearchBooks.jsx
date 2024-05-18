import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
const SearchBooks = () => {
    const [books,setBooks] = useState([])
  useEffect(()=>{
    const fetchAllBooks = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/booktitle",books.title)
        setBooks(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllBooks()
  },[])
  return (
    <div>
      <Navigation />
      <h1 className='head' >Books</h1>
      <div className="books">
        {books.map(book=>(
          <div className="book" key={book.id}>
            <h2>{book.id}</h2>
            <h2>{book.title}</h2>
            <h2>{book.desc}</h2>
            <p>{book.cover}</p>
            <span>{book.price}</span>
           </div>
        ))}
      </div>
      <button className="linkB"><Link to="/search">Back</Link></button>
  
    </div>
  )
}

export default SearchBooks
