import React, { useEffect, useState } from "react";
import WhatsApp from "./pages/WhatsApp";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import './global.css'
import {Router, Routes, useParams, Route} from 'react-router-dom'

let socket; // Declare socket outside the component
const endpoint = process.env.endpoint;

function App() {
  const queryParams = new URLSearchParams(window.location.search);
const token = queryParams.get("token");
localStorage.setItem("token", token)
  console.log("App component rendered");
  useEffect(() => {
    if (!socket) {
      // Initialize socket only if not already initialized
      socket = io("http://localhost:1600");

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      
    }
  }, []); 
  


  return (
    <>
    <WhatsApp socket={socket} />
  </>
)
}

export default App;
