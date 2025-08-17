import React, { useState } from 'react'
import { api, setToken } from '../api.jsx'

export default function Register({ goLogin, onRegistered }){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      const res = await api.register(email, password);
      setToken(res.token); onRegistered();
    }catch(ex){ setErr('Registration failed (email already used?)'); }
  }

  return (
    <div className="card" style={{maxWidth: 420, margin: '0 auto'}}>
      <h3>Create account</h3>
      <form onSubmit={submit}>
        <label>Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <div className="space"></div>
        <label>Password (min 6)</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="space"></div>
        {err && <div style={{color:'#b91c1c'}}>{err}</div>}
        <button className="btn" type="submit">Register</button>
        <button type="button" className="btn link" onClick={goLogin}>login</button>
      </form> 
    </div>
  )
}
