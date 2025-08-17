const base = import.meta.env.VITE_API_BASE;

export function setToken(t){ localStorage.setItem('token', t); }
export function getToken(){ return localStorage.getItem('token'); }
export function clearToken(){ localStorage.removeItem('token'); }

async function http(path, { method='GET', body, auth=true } = {}) {
  const headers = { 'Content-Type':'application/json' };
  if (auth && getToken()) headers['Authorization'] = `Bearer ${getToken()}`;
  const res = await fetch(`${base}${path}`, { method, headers, body: body?JSON.stringify(body):undefined });
  if (!res.ok) {
    const text = await res.text().catch(()=> '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

export const api = {
  async register(email, password){ return http('/auth/register', { method:'POST', auth:false, body:{ email, password } }); },
  async login(email, password){ return http('/auth/login', { method:'POST', auth:false, body:{ email, password } }); },


  async listLeads({ status, dueToday, page, size }){
    const q = new URLSearchParams();
    if (status) q.set('status', status);
    if (dueToday) q.set('dueToday', 'true');
    if (page!=null) q.set('page', page);
    if (size!=null) q.set('size', size);
    return http(`/leads?${q.toString()}`);
  },
  async createLead(payload){ return http('/leads', { method:'POST', body: payload }); },
  async getLead(id){ return http(`/leads/${id}`); },
  async updateLead(id, payload){ return http(`/leads/${id}`, { method:'PUT', body: payload }); },
  async deleteLead(id){ return http(`/leads/${id}`, { method:'DELETE' }); },

  async notes(leadId){ return http(`/leads/${leadId}/notes`); },
  async addNote(leadId, body){ return http(`/leads/${leadId}/notes`, { method:'POST', body: { body } }); },
};
