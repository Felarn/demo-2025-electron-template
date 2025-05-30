import './assets/main.css'

import { StrictMode } from 'react'
import { Routes, Route, HashRouter } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PartnerEditor from './PartnerEditor'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    {/* <StrictMode> */}
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/edit-partner' element={<PartnerEditor/>}/>
        <Route path='/create-partner' element={<PartnerEditor/>}/>
      </Routes>
    {/* </StrictMode> */}
  </HashRouter>
)
