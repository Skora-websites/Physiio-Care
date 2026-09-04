import { getImageUrl } from '../../utils/imageUrl';
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const PlayZoneServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', shortDescription: '', mainContent: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/playzone/services');
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service._id);
      setFormData({ title: service.title, shortDescription: service.shortDescription, mainContent: service.mainContent });
    } else {
      setEditingId(null);
      setFormData({ title: '', shortDescription: '', mainContent: '' });
    }
    setImage(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/playzone/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('shortDescription', formData.shortDescription);
    submitData.append('mainContent', formData.mainContent);
    if (image) {
      submitData.append('image', image);
    }

    try {
      if (editingId) {
        await api.put(`/playzone/services/${editingId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/playzone/services', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Play Zone Services</h2>
        <button className="admin-btn" style={{ width: 'auto' }} onClick={() => handleOpenModal()}>
          <FiPlus /> Add Service
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Image</th>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Short Description</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(svc => (
              <tr key={svc._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>
                  <img src={getImageUrl(svc.image)} alt={svc.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{svc.title}</td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>{svc.shortDescription.substring(0, 50)}...</td>
                <td style={{ padding: '1rem' }}>
                  <button onClick={() => handleOpenModal(svc)} style={{ marginRight: '1rem', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}><FiEdit size={18} /></button>
                  <button onClick={() => handleDelete(svc._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3>{editingId ? 'Edit Service' : 'Add Service'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input type="text" className="admin-input" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              <textarea className="admin-input" placeholder="Short Description" rows="2" value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} required />
              <textarea className="admin-input" placeholder="Main Content" rows="5" value={formData.mainContent} onChange={e => setFormData({ ...formData, mainContent: e.target.value })} required />
              <input type="file" className="admin-input" accept="image/*" onChange={e => setImage(e.target.files[0])} required={!editingId} />
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn">Save</button>
                <button type="button" className="admin-btn" style={{ backgroundColor: '#9ca3af' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayZoneServicesAdmin;
