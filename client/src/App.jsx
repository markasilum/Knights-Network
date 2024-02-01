import { useState } from 'react'
import './App.css'
import Mainpage from './components/Mainpage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CreateAccount from './pages/Create-Account/CreateAccount';
import EditAccount from './pages/Edit-Account/EditAccount';


function App() {

  return (
    <div className='className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	'>
      <Router>
          <Routes>
            <Route index element={<Mainpage/>}/>
            <Route path='/home' element={<Mainpage/>}/>
            <Route path="/createaccount" element={<CreateAccount/>}/>
            <Route path="/editaccount" element={<EditAccount/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
