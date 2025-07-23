import React from 'react'
import Nav from './components/Nav'
import Form from './components/Form'
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  

  return (
    <>
    <Nav/>
    <Form/>
    <ToastContainer/>
    </>
  )
}

export default App