import React, { useEffect, useMemo, useState } from 'react'
import { api } from "../api.jsx"
import LeadRow from './LeadRow.jsx'
import LeadDetailDrawer from './LeadDetailDrawer.jsx'

export default function LeadsPage(){
  const [leads, setLeads] = useState([])
  const [status, setStatus] = useState('')
  const [dueToday, setDueToday] = useState(false)
  const [name, setName] = useState(''); const [company, setCompany] = useState('')
  const [email, setEmail] = useState(''); const [phone, setPhone] = useState('')
  const [leadStatus, setLeadStatus] = useState('NEW'); const [next, setNext] = useState('')
  const [selected, setSelected] = useState(null)

  async function load(){ 
    const res = await api.listLeads({ status: status || undefined, dueToday })
    setLeads(res.content || [])
  }
  useEffect(()=>{ load() }, [status, dueToday])

  async function createLead(e){
    e.preventDefault()
    await api.createLead({
      name, company, email, phone, status: leadStatus || 'NEW',
      nextFollowUp: next || null
    })
    setName(''); setCompany(''); setEmail(''); setPhone(''); setLeadStatus('NEW'); setNext('')
    load()
  }

  return (
    <>
      <div className="card">
        <h3>New Lead</h3>
        <form onSubmit={createLead} className="flex" style={{flexWrap:'wrap'}}>
          <input className="input" placeholder="Name *" value={name} onChange={e=>setName(e.target.value)} style={{flex:'1 1 200px'}}/>
          <input className="input" placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} style={{flex:'1 1 200px'}}/>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{flex:'1 1 200px'}}/>
          <input className="input" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{flex:'1 1 120px'}}/>
          <select value={leadStatus} onChange={e=>setLeadStatus(e.target.value)} className="input" style={{flex:'0 0 180px'}}>
            <option>NEW</option><option>CONTACTED</option><option>NEGOTIATING</option><option>WON</option><option>LOST</option>
          </select>
          <input type="date" className="input" value={next} onChange={e=>setNext(e.target.value)} style={{flex:'0 0 180px'}}/>
          <button className="btn" type="submit" style={{flex:'0 0 120px'}}>Add</button>
        </form>
      </div>

      <div className="space"></div>

      <div className="card">
        <div className="flex" style={{justifyContent:'space-between'}}>
          <div className="flex">
            <label>Status:&nbsp;</label>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="input" style={{width:180}}>
              <option value="">All</option>
              <option>NEW</option><option>CONTACTED</option><option>NEGOTIATING</option><option>WON</option><option>LOST</option>
            </select>
            <label className="flex" style={{marginLeft:16}}>
              <input type="checkbox" checked={dueToday} onChange={e=>setDueToday(e.target.checked)} />
              &nbsp;Due Today
            </label>
          </div>
          <button className="btn secondary" onClick={load}>Refresh</button>
        </div>

        <div className="space"></div>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Company</th><th>Email</th><th>Phone</th><th>Status</th><th>Next</th><th>Badge</th><th></th></tr>
          </thead>
          <tbody>
            {leads.map(l => <LeadRow key={l.id} lead={l} onOpen={()=>setSelected(l)} onChanged={load} />)}
            {leads.length===0 && <tr><td colSpan="8">No leads</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && <LeadDetailDrawer leadId={selected.id} onClose={()=>setSelected(null)} />}
    </>
  )
}
