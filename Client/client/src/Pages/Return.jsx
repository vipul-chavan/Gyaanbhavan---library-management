import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
const Return = () => {
  const [returnD, setreturnD] = useState({
    returnDate: "",
  });

  const { orderID } = useParams();
  console.log(orderID);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setreturnD((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/return/" + orderID, returnD);
      navigate("/fine");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(returnD);
  return (
    <div>
      <Navigation />
      <div className="forms">
        <div className="form">
          <h1>Return Date</h1>
          <label>Return Date: </label>
          <input type="date" name="returnDate" onChange={handleChange} />
          <button className="formButton" onClick={handleClick}>
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default Return;
