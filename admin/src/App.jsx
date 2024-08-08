import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes ,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <div>
    <ToastContainer/>
    <Navbar />
    <hr />
    <div className='app-content'>
     <Sidebar /> 
     <Routes>
     <Route path='/add' element={<Add/>}/>
     <Route path='/list' element={<List/>}/>
     <Route path='/Orders' element={<Orders/>}/>
   
     </Routes> 
    </div>
    </div>
  )
}

export default App
