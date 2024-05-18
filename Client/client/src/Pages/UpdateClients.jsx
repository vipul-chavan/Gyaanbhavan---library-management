import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
const UpdateClients = () => {
    const [client,setClient] = useState({
        name:"",
        emailId:"",
        address:"",
        gender:"",
      });
    
      const navigate = useNavigate();
      const location = useLocation();
      
    
      const clientId = location.pathname.split("/")[2];
      
      const handleChange = async e =>{
        setClient(prev=>({...prev , [e.target.name]: e.target.value}))
      };
      const handleClick = async e =>{
          e.preventDefault()
          try{
            await axios.put("http://localhost:8800/client/"+clientId,client)
            navigate("/clients");
          }catch(err){
              console.log(err);
          }
        }
      
      
      console.log(client)
      // const { idClient } = useParams();
      // console.log(idClient);
      return (
        <div>
          <Navigation/>
        <div className='forms'>
        <div className="form">
          <h1>Update Client Details</h1>
          <input type="number" name="idClient" value={clientId} disabled/>
          <input type="text" name="name" onChange={handleChange} placeholder='Name' />
          <input type="text" name="emailId" onChange={handleChange} placeholder='Email id' />
          <input type="text" name="address" onChange={handleChange} placeholder='Address' />
          <input type="text" name="gender" onChange={handleChange} placeholder='Gender' />
          <button className="formButton" onClick={handleClick}>Update</button>
        </div>
        </div>
        </div>
      );
}

export default UpdateClients
