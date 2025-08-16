import React, { useState } from 'react'
import { api, setToken } from '../api.jsx'

export default function Login({ goRegister, onLoggedIn }){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      const res = await api.login(email, password);
      setToken(res.token); onLoggedIn();
    }catch(ex){ setErr('Invalid email or password'); }
  }

  return (
    <div className="card" style={{maxWidth: 420, margin: '0 auto'}}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <label>Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <div className="space"></div>
        <label>Password</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="space"></div>
        {err && <div style={{color:'#b91c1c'}}>{err}</div>}
        <button className="btn" type="submit">Login</button>
        <button type="button" className="btn link" onClick={goRegister}>Create account</button>
      </form>
    </div>
  )
}
