import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
const AddClients = () => {
    const [client,setClient] = useState({
        name:"",
        emailId:"",
        address:"",
        gender:"",
      });
    
      const navigate = useNavigate();
    
      const handleChange = async e =>{
        setClient(prev=>({...prev , [e.target.name]: e.target.value}))
      };
      const handleClick = async e =>{
          e.preventDefault()
          try{
            await axios.post("http://localhost:8800/client",client)
            navigate("/clients");
          }catch(err){
              console.log(err);
          }
        }
      
      
      console.log(client)
      return (
        <div>
          <Navigation/>
        <div className='forms'>
        <div className="form">
          <h1>Add A Client</h1>
          <input type="text" name="name" onChange={handleChange} placeholder='name' />
          <input type="text" name="emailId" onChange={handleChange} placeholder='email address' />
          <input type="text" name="address" onChange={handleChange} placeholder='address' />
          <input type="text" name="gender" onChange={handleChange} placeholder='gender' />
          <button className="formButton" onClick={handleClick}>Add</button>
        </div>
        </div>
        </div>
      );
};

export default AddClients
