import { getImageUrl } from '../../utils/imageUrl';
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const PlayZoneGalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ altText: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await api.get('/playzone/gallery');
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({ altText: item.altText });
    } else {
      setEditingId(null);
      setFormData({ altText: '' });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await api.delete(`/playzone/gallery/${id}`);
        fetchGallery();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('altText', formData.altText);
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      if (editingId) {
        await api.put(`/playzone/gallery/${editingId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/playzone/gallery', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setIsModalOpen(false);
      fetchGallery();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Play Zone Gallery</h2>
        <button className="admin-btn" style={{ width: 'auto' }} onClick={() => handleOpenModal()}>
          <FiPlus /> Add Image
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {images.map(item => (
          <div key={item._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={getImageUrl(item.image)} alt={item.altText} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#4b5563', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.altText || 'No caption'}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleOpenModal(item)} style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}><FiEdit /></button>
                <button onClick={() => handleDelete(item._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
            <h3>{editingId ? 'Edit Image' : 'Add Image'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input type="text" className="admin-input" placeholder="Image Caption / Alt Text" value={formData.altText} onChange={e => setFormData({ ...formData, altText: e.target.value })} />
              <input type="file" className="admin-input" accept="image/*" onChange={e => setImageFile(e.target.files[0])} required={!editingId} />
              
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

export default PlayZoneGalleryAdmin;
