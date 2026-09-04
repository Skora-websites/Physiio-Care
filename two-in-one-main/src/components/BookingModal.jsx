import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import api from '../admin/utils/api';
import './BookingModal.css';

const BookingModal = ({ basePath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    service: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openBookingModal', handleOpen);

    // Fetch services based on basePath
    const fetchServices = async () => {
      try {
        const endpoint = basePath === '/doctor' ? '/services' : '/playzone/services';
        const { data } = await api.get(endpoint);
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services for booking modal:', error);
      }
    };

    fetchServices();

    return () => window.removeEventListener('openBookingModal', handleOpen);
  }, [basePath]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Submitting...' });

    try {
      const source = basePath === '/doctor' ? 'doctor' : 'playzone';
      await api.post('/leads', { ...formData, source });
      setStatus({ type: 'success', msg: 'Appointment booked successfully! We will contact you soon.' });
      setTimeout(() => {
        setIsOpen(false);
        setStatus({ type: '', msg: '' });
        setFormData({ name: '', age: '', phone: '', service: '' });
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'Failed to book appointment. Please try again.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content">
        <button className="booking-modal-close" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>

        <h2>Book Your Appointment</h2>

        {status.msg && (
          <div className={`booking-status ${status.type}`}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{basePath === '/play-zone' ? 'Kid Name*' : 'Name*'}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={basePath === '/play-zone' ? "Enter kid's name" : "Enter your name"}
              required
            />
          </div>

          <div className="form-group">
            <label>Age*</label>
            <input
              type="text"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              placeholder="Enter age (e.g. 5 years)"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              pattern="[0-9+\-\s()]+"
              required
            />
          </div>

          {basePath === '/doctor' && (
            <div className="form-group">
              <label>Services*</label>
              <select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">Select Service</option>
                {services.map(s => (
                  <option key={s._id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="booking-submit-btn" disabled={status.type === 'loading'}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
