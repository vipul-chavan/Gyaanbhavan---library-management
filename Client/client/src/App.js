import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Books from "./Pages/Books";
import AddBooks from "./Pages/AddBooks";
import UpdateBooks from "./Pages/UpdateBooks";
import LoginAdmin from "./Pages/LoginAdmin";
import Dashboard from "./Pages/Dashboard";
import "./style.css";
import "./dashnav.css";
import "./searchstyle.css";
import Clients from "./Pages/Clients";
import AddClients from "./Pages/AddClients";
import UpdateClients from "./Pages/UpdateClients";
import Orders from "./Pages/Orders";
import AddOrders from "./Pages/AddOrders";
import SendMail from "./Pages/SendMail";
import Search from "./Pages/Search";
import SearchBooks from "./Pages/SearchBooks";
import SearchClients from "./Pages/SearchClients";
import SearchOrders from "./Pages/SearchOrders";
import Fine from "./Pages/Fine";
import Return from "./Pages/Return";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<Books />} />
          <Route path="/add" element={<AddBooks />} />
          <Route path="/update/:id" element={<UpdateBooks />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/addclient" element={<AddClients />} />
          <Route path="/updateclient/:id" element={<UpdateClients />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addorder" element={<AddOrders />} />
          <Route path="/sendemail/:orderID" element={<SendMail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchbooks" element={<SearchBooks />} />
          <Route path="/searchclients" element={<SearchClients />} />
          <Route path="/searchorders" element={<SearchOrders />} />
          <Route path="/fine" element={<Fine />} />
          <Route path="/return/:orderID" element={<Return />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

//npm install react-router-dom  --  install package
//npm i axios
//npm i cors -- in backend

//Backend % nodemon index.js
//client % npm start

// lsof -i :8800
// kill pid
