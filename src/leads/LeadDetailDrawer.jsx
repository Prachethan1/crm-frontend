import React, { useEffect, useState } from 'react'
import { api } from '../api.jsx'

export default function LeadDetailDrawer({ leadId, onClose }){
  const [lead, setLead] = useState(null)
  const [notes, setNotes] = useState([])
  const [body, setBody] = useState('')

  async function load(){
    const [l, n] = await Promise.all([api.getLead(leadId), api.notes(leadId)])
    setLead(l); setNotes(n)
  }
  useEffect(()=>{ load() }, [leadId])

  async function addNote(e){
    e.preventDefault()
    if (!body.trim()) return
    await api.addNote(leadId, body.trim())
    setBody(''); load()
  }

  if (!lead) return null

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <aside className="drawer">
        <h3>{lead.name}</h3>
        <div className="space"></div>
        <div><b>Company:</b> {lead.company || '-'}</div>
        <div><b>Email:</b> {lead.email || '-'}</div>
        <div><b>Phone:</b> {lead.phone || '-'}</div>
        <div><b>Status:</b> {lead.status} &nbsp; {lead.badge && <span className={lead.badge==='Today'?'badge today':'badge overdue'}>{lead.badge}</span>}</div>
        <div><b>Next Follow-up:</b> {lead.nextFollowUp || '-'}</div>
        <div className="space"></div>
        <h4>Notes</h4>
        <div className="space"></div>
        {notes.length===0 && <div>No notes yet</div>}
        {notes.map(n=>(
          <div key={n.id} style={{borderLeft:'3px solid #e2e8f0', paddingLeft:8, marginBottom:12}}>
            <div style={{fontSize:12, opacity:.7}}>{new Date(n.createdAt).toLocaleString()} — {n.authorEmail}</div>
            <div>{n.body}</div>
          </div>
        ))}
        <form onSubmit={addNote} className="flex" style={{marginTop:12}}>
          <input className="input" placeholder="Add note..." value={body} onChange={e=>setBody(e.target.value)} />
          <button className="btn" type="submit">Add</button>
          <button className="btn secondary" type="button" onClick={onClose}>Close</button>
        </form>
      </aside>
    </>
  )
}
