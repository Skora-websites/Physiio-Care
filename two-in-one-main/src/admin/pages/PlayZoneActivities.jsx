import { getImageUrl } from '../../utils/imageUrl';
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const PlayZoneActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data } = await api.get('/playzone/activities');
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (activity = null) => {
    if (activity) {
      setEditingId(activity._id);
      setFormData({ title: activity.title, description: activity.description });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '' });
    }
    setImage(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await api.delete(`/playzone/activities/${id}`);
        fetchActivities();
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    if (image) {
      submitData.append('image', image);
    }

    try {
      if (editingId) {
        await api.put(`/playzone/activities/${editingId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/playzone/activities', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setIsModalOpen(false);
      fetchActivities();
    } catch (error) {
      console.error('Error saving activity:', error);
      alert('Failed to save activity');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Play Zone Activities</h2>
        <button className="admin-btn" style={{ width: 'auto' }} onClick={() => handleOpenModal()}>
          <FiPlus /> Add Activity
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Image</th>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Description</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(act => (
              <tr key={act._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>
                  <img src={getImageUrl(act.image)} alt={act.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{act.title}</td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>{act.description.substring(0, 50)}...</td>
                <td style={{ padding: '1rem' }}>
                  <button onClick={() => handleOpenModal(act)} style={{ marginRight: '1rem', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}><FiEdit size={18} /></button>
                  <button onClick={() => handleDelete(act._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h3>{editingId ? 'Edit Activity' : 'Add Activity'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input type="text" className="admin-input" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              <textarea className="admin-input" placeholder="Description" rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
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

export default PlayZoneActivities;
