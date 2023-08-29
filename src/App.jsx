import React from 'react'
import { Route, Router, Routes } from 'react-router'
import Form from './Pages/Form'
import { Toaster } from 'react-hot-toast'
import SaveFormData from './Pages/SaveFormData'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/t' element={<SaveFormData/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}
export default App;
