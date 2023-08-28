import React from 'react'
import { Route, Router, Routes } from 'react-router'
import Form from './Pages/Form'
import UpdateFromData from './Pages/UpdateFormData'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/t' element={<UpdateFromData/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}
export default App;
