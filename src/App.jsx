import React, { useEffect, useState } from 'react'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import LeadsPage from './leads/LeadsPage.jsx'
import { getToken, clearToken } from './api.jsx'

export default function App(){
  const [view, setView] = useState(getToken() ? 'leads' : 'login')
  useEffect(()=>{ if (!getToken()) setView('login') },[])

  return (
    <div className="container">
      <header className="flex" style={{justifyContent:'space-between'}}>
        <h2>CRM Lite</h2>
        <div className="flex">
          {getToken() && <button className="btn secondary" onClick={()=>{ clearToken(); setView('login'); }}>Logout</button>}
        </div>
      </header>

      <div className="space"></div>

      {view==='login' && <Login goRegister={()=>setView('register')} onLoggedIn={()=>setView('leads')} />}
      {view==='register' && <Register goLogin={()=>setView('login')} onRegistered={()=>setView('leads')} />}
      {view==='leads' && <LeadsPage />}
    </div>
  )
}
