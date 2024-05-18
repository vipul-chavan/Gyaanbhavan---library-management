import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [book, setBook] = useState({
    title: "",
  });
  const [client, setClient] = useState({
    name: "",
  });
  const [order, setOrder] = useState({
    idClient: "",
  });

  const clienthandleChange = async (e) => {
    setClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const bookhandleChange = async (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const orderhandleChange = async (e) => {
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const bookhandleClick = async () => {
    try {
      // Check if the book record exists
      const bookResult = await axios.get(
        "http://localhost:8800/booktitle/" + book.title
      );
      console.log(bookResult);
      if (bookResult.data) {
        setOrderData(null);
        setClientData(null);
        setBookData(bookResult.data);
      }
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        setErrorMessage("Could not connect to the server");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const clienthandleClick = async () => {
    try {
      // Check if the client record exists
      const clientResult = await axios.get(
        "http://localhost:8800/getClientData/" + client.name
      );
      console.log("client = ", clientResult.data);
      if (clientResult.data) {
        setBookData(null);
        setOrderData(null);
        setClientData(clientResult.data);
      }
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        setErrorMessage("Could not connect to the server");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const orderhandleClick = async () => {
    try {
      // Check if the order record exists
      const orderResult = await axios.get(
        "http://localhost:8800/getOrderData/" + order.idClient
      );

      if (orderResult.data) {
        setBookData(null);
        setClientData(null);
        setOrderData(orderResult.data);
      }
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        setErrorMessage("Could not connect to the server");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="container">
      <Navigation />
      <h1 className="head">Search</h1>
      <div className="search-con">
        <div className="search-card">
          <h2>Search Books</h2>
          <input
            type="text"
            name="title"
            onChange={bookhandleChange}
            placeholder="Title"
          />

          <button className="linkB" onClick={bookhandleClick}>
            Search
          </button>
        </div>
        <div className="search-card">
          <h2>Search Clients</h2>
          <input
            type="text"
            name="name"
            onChange={clienthandleChange}
            placeholder="Name"
          />

          <button className="linkB" onClick={clienthandleClick}>
            Search
          </button>
        </div>
        <div className="search-card">
          <h2>Search Orders</h2>
          <input
            type="text"
            name="idClient"
            onChange={orderhandleChange}
            placeholder="Client-Id"
          />

          <button className="linkB" onClick={orderhandleClick}>
            Search
          </button>
        </div>
      </div>

      <div
        style={{
          margin: 10,
        }}
      >
        {bookData !== null && (
          <div>
            <h1 className="head">Books</h1>
            <div className="books">
              {bookData.map((book) => (
                <div className="book" key={book.id}>
                  <h2>ID: {book.id}</h2>
                  <h2>TITLE: {book.title}</h2>
                  <h2>AUTHOR: {book.desc}</h2>
                  <p>COVER: {book.cover}</p>
                  <span>PRICE: {book.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {clientData !== null && (
          <div>
            <h1 className="head">Clients</h1>
            <div className="books">
              {clientData.map((client) => (
                <div className="book" key={client.idClient}>
                  <h2>ID: {client.idClient}</h2>
                  <h2>NAME: {client.name}</h2>
                  <h2>{client.emailId}</h2>
                  <p>ADD: {client.address}</p>
                  <span>GENDER: {client.gender}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {orderData !== null && (
          <div>
            <h1 className="head">Order</h1>
            <div className="books">
              {orderData.map((order) => (
                <div className="book" key={order.orderID}>
                  <h2>ORDER-ID: {order.orderID}</h2>
                  <h2>CLIENT-ID: {order.idClient}</h2>
                  <h2>BOOK-TITLE: {order.title}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
