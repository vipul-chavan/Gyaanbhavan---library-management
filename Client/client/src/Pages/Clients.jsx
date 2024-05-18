import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Clients = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await axios.get("http://localhost:8800/client");
        setClients(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllClients();
  }, []);

  const handleDelete = async (idClient) => {
    try {
      const res = await axios.delete(
        "http://localhost:8800/client/" + idClient
      );
      window.location.reload();
      setClients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navigation />
      <h1 className="head">Clients</h1>
      <div className="books">
        {clients.map((client) => (
          <div className="book" key={client.idClient}>
            <h2>NAME: {client.name}</h2>
            <h2>{client.emailId}</h2>
            <p>ADD: {client.address}</p>
            <span>GENDER: {client.gender}</span>

            <button
              className="update"
              onClick={() => handleDelete(client.idClient)}
            >
              Delete
            </button>
            <button className="delete">
              <Link to={`/updateclient/${client.idClient}`}>Update</Link>{" "}
            </button>
          </div>
        ))}
      </div>

      <button className="linkB">
        <Link to="/addclient">Add Client</Link>
      </button>
    </div>
  );
};

export default Clients;
