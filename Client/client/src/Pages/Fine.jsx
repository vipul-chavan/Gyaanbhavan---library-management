import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Navigation from "./Navigation";
const Fine = () => {
  const [fine, setFine] = useState([]);
  useEffect(() => {
    const fetchAllFine = async () => {
      try {
        const res = await axios.get("http://localhost:8800/fine");
        setFine(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFine();
  }, []);

  const handleDelete = async (idFine) => {
    try {
      const res = await axios.delete(
        "http://localhost:8800/finedelete/" + idFine
      );
      window.location.reload();
      setFine(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navigation />
      <h1 className="head">Fine</h1>
      <div className="books">
        {fine.map((finee) => (
          <div className="book" key={finee.idFine}>
            <h2>ORDER-ID: {finee.orderID}</h2>
            <h2>FINE: {finee.fine}</h2>
            <button
              className="update"
              onClick={() => handleDelete(finee.idFine)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fine;
