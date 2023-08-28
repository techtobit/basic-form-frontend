import React from 'react'
import { Route, Router, Routes } from 'react-router'
import Form from './Pages/Form'
import UpdateFromData from './Pages/UpdateFormData'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/t' element={<UpdateFromData/>}/>
    </Routes>
    </div>
  )
}
export default App;
