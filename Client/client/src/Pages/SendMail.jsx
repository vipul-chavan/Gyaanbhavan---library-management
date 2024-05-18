import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SendMail = () => {
    const { orderID } = useParams();
    console.log(orderID);
    const [emailID,setEmailId] = useState("");
    const navigate = useNavigate();
    console.log("email isssss",emailID);
    useEffect(()=>{
      const fetchAllOrders = async()=>{
        try{
          const res = await axios.get("http://localhost:8800/getemail/"+orderID);
          console.log("Emailid=",res.data);
          setEmailId(res.data);

        }catch(err){
          console.log(err);
        }
      }
      fetchAllOrders()
    },[])

    const sendEmail = async(e)=>{
      e.preventDefault();
      const res= await fetch("http://localhost:8800/sendmails",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify({
          emailID
        })
      });
      console.log(res);
      navigate('/orders');
    }
  return (
    <div>
      <Navigation/>
    <div className='forms'>
    <div className="form">
    <h1>Send Mail</h1>
    <input type="text" name="emailID" value={emailID} disabled/>
    <button className="formButton" onChange={(e)=>setEmailId(e.target.value)} onClick={sendEmail}>Send</button>
  </div>
  </div>
  </div>
  )
}

export default SendMail
