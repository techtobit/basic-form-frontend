import React from 'react'
import { Route, Router, Routes } from 'react-router'
import Form from './Pages/Form'
import { Toaster } from 'react-hot-toast'
import SaveFormData from './Pages/SaveFormData'
import Home from './Pages/Home'
import './App.css';


const App = () => {
  return (
    <div>
    <Home/>
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/viewForm' element={<SaveFormData/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}
export default App;
