import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import '../styles/admin.css';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'doctor', 'playzone'
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/leads');
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/leads/${id}/status`, { status: newStatus });
      setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        setLeads(leads.filter(lead => lead._id !== id));
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    return lead.source === filter;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--admin-text-main)' }}>Manage Leads</h2>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`admin-btn ${filter === 'all' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All Leads
          </button>
          <button 
            className={`admin-btn ${filter === 'doctor' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setFilter('doctor')}
          >
            Doctor Leads
          </button>
          <button 
            className={`admin-btn ${filter === 'playzone' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setFilter('playzone')}
          >
            Playzone Leads
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Source</th>
              <th>Name / Kid Name</th>
              <th>Contact Info</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading leads...</td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No leads found.</td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead._id}>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      backgroundColor: lead.source === 'doctor' ? '#E0F2FE' : '#FCE7F3',
                      color: lead.source === 'doctor' ? '#0369A1' : '#BE185D'
                    }}>
                      {lead.source.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontWeight: '500' }}>{lead.name}</td>
                  <td>
                    {lead.age && <div style={{ fontSize: '0.9rem' }}>Age: {lead.age}</div>}
                    <div style={{ fontSize: '0.9rem', color: 'var(--admin-text-muted)' }}>{lead.phone}</div>
                  </td>
                  <td>{lead.service}</td>
                  <td>
                    <select 
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      style={{ 
                        padding: '6px', 
                        borderRadius: '4px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: lead.status === 'new' ? '#FEF3C7' : lead.status === 'contacted' ? '#DBEAFE' : '#D1FAE5'
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="admin-btn admin-btn-secondary"
                      onClick={() => alert(`Message: ${lead.message || 'No message provided'}`)}
                    >
                      View Msg
                    </button>
                    <button 
                      className="admin-btn admin-btn-secondary"
                      style={{ backgroundColor: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' }}
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
