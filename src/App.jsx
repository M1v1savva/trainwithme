import React, { useState } from "react"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './Pages/Home.jsx'
import Standings from './Pages/Standings.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  const [tableData, setTableData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home tableData={tableData} setTableData={setTableData} />}/>
        <Route path='standings' element={<Standings tableData={tableData} setTableData={setTableData} />}/>
      </Routes>
    </BrowserRouter>
  )

}  
    
export default App;
