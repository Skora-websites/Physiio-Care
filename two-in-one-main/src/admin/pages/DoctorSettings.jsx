import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DoctorSettings = () => {
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    aboutTitle: '',
    aboutText: '',
  });
  
  const [features, setFeatures] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [aboutImage, setAboutImage] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/about');
      if (data) {
        setFormData({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          contactPhone: data.contactPhone || '',
          contactEmail: data.contactEmail || '',
          contactAddress: data.contactAddress || '',
          aboutTitle: data.aboutTitle || '',
          aboutText: data.aboutText || '',
        });
        setFeatures(data.features || []);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, { title: '', desc: '', icon: 'CheckCircle' }]);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    submitData.append('features', JSON.stringify(features));
    
    if (heroImage) submitData.append('heroImage', heroImage);
    if (aboutImage) submitData.append('aboutImage', aboutImage);

    try {
      await api.post('/about', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Settings saved successfully!');
    } catch (error) {
      setMessage('Failed to save settings.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="admin-settings-page" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Doctor Site Settings</h2>
      {message && <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: message.includes('success') ? '#d1fae5' : '#fee2e2', color: message.includes('success') ? '#065f46' : '#991b1b', borderRadius: '4px' }}>{message}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Hero Section */}
        <section style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>Hero Section</h3>
          <div className="admin-form-group" style={{ marginTop: '1rem' }}>
            <label className="admin-label">Hero Title</label>
            <input type="text" className="admin-input" name="heroTitle" value={formData.heroTitle} onChange={handleInputChange} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Hero Subtitle</label>
            <textarea className="admin-input" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleInputChange} rows="2" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Hero Image</label>
            <input type="file" className="admin-input" accept="image/*" onChange={(e) => setHeroImage(e.target.files[0])} />
          </div>
        </section>

        {/* Contact Section */}
        <section style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>Contact Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Phone</label>
              <input type="text" className="admin-input" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Email</label>
              <input type="email" className="admin-input" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Address</label>
            <input type="text" className="admin-input" name="contactAddress" value={formData.contactAddress} onChange={handleInputChange} />
          </div>
        </section>

        {/* About Section */}
        <section style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px' }}>
          <h3>About Section</h3>
          <div className="admin-form-group" style={{ marginTop: '1rem' }}>
            <label className="admin-label">About Title</label>
            <input type="text" className="admin-input" name="aboutTitle" value={formData.aboutTitle} onChange={handleInputChange} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">About Text</label>
            <textarea className="admin-input" name="aboutText" value={formData.aboutText} onChange={handleInputChange} rows="4" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">About Image</label>
            <input type="file" className="admin-input" accept="image/*" onChange={(e) => setAboutImage(e.target.files[0])} />
          </div>
        </section>

        {/* Features Section */}
        <section style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Features</h3>
            <button type="button" onClick={addFeature} className="admin-btn" style={{ width: 'auto', padding: '0.5rem 1rem' }}>+ Add Feature</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {features.map((feature, index) => (
              <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#f9fafb', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input type="text" className="admin-input" placeholder="Feature Title" value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} />
                  <textarea className="admin-input" placeholder="Feature Description" value={feature.desc} onChange={(e) => handleFeatureChange(index, 'desc', e.target.value)} rows="2" />
                </div>
                <button type="button" onClick={() => removeFeature(index)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
            {features.length === 0 && <p style={{ color: '#6b7280' }}>No features added.</p>}
          </div>
        </section>

        <button type="submit" className="admin-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
};

export default DoctorSettings;
