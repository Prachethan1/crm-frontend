import React, { useState } from 'react'
import { api } from '../api.jsx'

export default function LeadRow({ lead, onOpen, onChanged }){
  const [editing, setEditing] = useState(false)
  const [status, setStatus] = useState(lead.status)
  const [next, setNext] = useState(lead.nextFollowUp || '')

  async function save(){
    await api.updateLead(lead.id, {
      name: lead.name, company: lead.company, email: lead.email, phone: lead.phone,
      status, nextFollowUp: next || null
    })
    setEditing(false); onChanged()
  }
  async function del(){ if (confirm('Delete lead?')) { await api.deleteLead(lead.id); onChanged(); } }

  const badgeCls = lead.badge === 'Today' ? 'badge today' : lead.badge === 'Overdue' ? 'badge overdue' : 'badge'

  return (
    <tr className="row">
      <td><button className="btn link" onClick={onOpen}>{lead.name}</button></td>
      <td>{lead.company || '-'}</td>
      <td>{lead.email || '-'}</td>
      <td>{lead.phone || '-'}</td>
      <td>
        {editing ?
          <select value={status} onChange={e=>setStatus(e.target.value)} className="input" style={{width:150}}>
            <option>NEW</option><option>CONTACTED</option><option>NEGOTIATING</option><option>WON</option><option>LOST</option>
          </select> : lead.status}
      </td>
      <td>
        {editing ? <input type="date" className="input" value={next||''} onChange={e=>setNext(e.target.value)} style={{width:150}}/>
                 : (lead.nextFollowUp || '-')}
      </td>
      <td>{lead.badge ? <span className={badgeCls}>{lead.badge}</span> : ''}</td>
      <td className="flex">
        {!editing && <button className="btn secondary" onClick={()=>setEditing(true)}>Edit</button>}
        {editing && <button className="btn" onClick={save}>Save</button>}
        {editing && <button className="btn secondary" onClick={()=>setEditing(false)}>Cancel</button>}
        <button className="btn secondary" onClick={del}>Delete</button>
      </td>
    </tr>
  )
}
