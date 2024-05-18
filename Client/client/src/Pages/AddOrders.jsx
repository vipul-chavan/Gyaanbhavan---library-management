import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
const AddOrders = () => {
  const [formData, setFormData] = useState({
    idClient: "",
    id: "",
    issueDate: "",
    dueDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async () => {
    try {
      console.log("changes = ", formData);

      // Check if the client record exists
      const clientResult = await axios.get(
        "http://localhost:8800/client/" + formData.idClient
      );

      // Check if the book record exists
      const bookResult = await axios.get(
        "http://localhost:8800/book/" + formData.id
      );

      // Insert the order record
      const res = await axios.post("http://localhost:8800/order", formData);
      console.log("orders = ", res);
      if (res.data.errno) {
        alert("Unable to add order, please check book id and client id");
      }

      // Navigate to the orders page
      navigate("/orders");
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        setErrorMessage("Could not connect to the server");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div>
      <Navigation />
      <div className="forms">
        <div className="form">
          <h1>Add Order</h1>
          <input
            type="text"
            name="idClient"
            onChange={handleChange}
            placeholder="Enter valid client id"
          />
          <input
            type="text"
            name="id"
            onChange={handleChange}
            placeholder="Enter valid book id"
          />
          <label>Issue Date: </label>
          <input
            type="date"
            name="issueDate"
            onChange={handleChange}
            placeholder="Issue Date"
          />
          <label>Due Date: </label>
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            placeholder="Due Date"
          />

          {errorMessage && <div className="error">{errorMessage}</div>}
          <button className="formButton" onClick={handleClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrders;
