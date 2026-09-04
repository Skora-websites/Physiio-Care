import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiSave, FiTrash2, FiPlayCircle, FiPlus } from 'react-icons/fi';

const VideoShowcaseAdmin = ({ websiteType }) => {
    const [showcase, setShowcase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        buttonText: 'Book Appointment',
        buttonLink: '/appointment',
        relatedText: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchShowcase();
    }, [websiteType]);

    const fetchShowcase = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/video-showcase/type/${websiteType}`);
            if (response.data.success && response.data.data) {
                setShowcase(response.data.data);
                setFormData({
                    title: response.data.data.title || '',
                    description: response.data.data.description || '',
                    videoUrl: response.data.data.videoUrl || '',
                    buttonText: response.data.data.buttonText || '',
                    buttonLink: response.data.data.buttonLink || '',
                    relatedText: response.data.data.relatedText || ''
                });
                setIsEditing(true);
            }
        } catch (error) {
            // If 404, it means no showcase exists yet, which is fine
            if (error.response && error.response.status === 404) {
                setShowcase(null);
                setIsEditing(false);
            } else {
                console.error("Error fetching video showcase:", error);
                setError("Failed to load video showcase data.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getAuthHeaders = () => {
        // Handled by api interceptor
        return {};
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const dataToSubmit = { ...formData, websiteType, isActive: true };

            if (showcase && showcase._id) {
                // Update
                const res = await api.put(`/video-showcase/${showcase._id}`, dataToSubmit);
                setShowcase(res.data.data);
                setSuccess('Video showcase updated successfully!');
            } else {
                // Create
                const res = await api.post('/video-showcase', dataToSubmit);
                setShowcase(res.data.data);
                setIsEditing(true);
                setSuccess('Video showcase created successfully!');
            }
        } catch (error) {
            console.error("Error saving video showcase:", error);
            setError(error.response?.data?.message || 'Failed to save video showcase');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this video showcase?')) return;
        
        try {
            await api.delete(`/video-showcase/${showcase._id}`);
            setShowcase(null);
            setFormData({
                title: '',
                description: '',
                videoUrl: '',
                buttonText: 'Book Appointment',
                buttonLink: '/appointment',
                relatedText: ''
            });
            setIsEditing(false);
            setSuccess('Video showcase deleted successfully!');
        } catch (error) {
            console.error("Error deleting video showcase:", error);
            setError('Failed to delete video showcase');
        }
    };

    const getVideoDetails = (url) => {
        if (!url) return null;
        
        // YouTube
        const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const ytMatch = url.match(ytRegExp);
        if (ytMatch && ytMatch[2].length === 11) {
            return { 
                type: 'youtube', 
                embedUrl: `https://www.youtube.com/embed/${ytMatch[2]}` 
            };
        }

        // Instagram
        if (url.includes('instagram.com')) {
            const igRegExp = /(?:instagram\.com)\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/i;
            const igMatch = url.match(igRegExp);
            if (igMatch && igMatch[1]) {
                return { 
                    type: 'instagram', 
                    embedUrl: `https://www.instagram.com/p/${igMatch[1]}/embed/` 
                };
            }
        }

        // Facebook
        if (url.includes('facebook.com') || url.includes('fb.watch')) {
            return { 
                type: 'facebook', 
                embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&t=0` 
            };
        }

        return null;
    };

    if (loading) return <div className="admin-loading">Loading...</div>;

    return (
        <div className="admin-content-inner">
            <div className="admin-header">
                <h2>{websiteType === 'doctor' ? 'Doctor' : "Let's Play Zone"} Video Showcase</h2>
            </div>

            {error && <div className="admin-error-message">{error}</div>}
            {success && <div className="admin-success-message">{success}</div>}

            <div className="admin-card">
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Title *</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="e.g. Welcome to Our Clinic"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                            required 
                            rows="4"
                            placeholder="Enter description text here..."
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Video URL (YouTube, Instagram, Facebook) *</label>
                        <input 
                            type="text" 
                            name="videoUrl" 
                            value={formData.videoUrl} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="https://www.youtube.com/watch?v=... or Instagram/Facebook URL"
                        />
                        {formData.videoUrl && getVideoDetails(formData.videoUrl) && (
                            <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                                {getVideoDetails(formData.videoUrl).type === 'instagram' ? (
                                    <iframe 
                                        style={{ width: '100%', aspectRatio: '9/16', height: 'auto', border: 'none' }}
                                        src={getVideoDetails(formData.videoUrl).embedUrl}
                                        title="Instagram video player" 
                                        frameBorder="0" 
                                        scrolling="no"
                                        allowTransparency="true"
                                        allow="encrypted-media"
                                    ></iframe>
                                ) : getVideoDetails(formData.videoUrl).type === 'facebook' ? (
                                    <iframe 
                                        style={{ width: '100%', aspectRatio: '16/9', height: 'auto', border: 'none' }}
                                        src={getVideoDetails(formData.videoUrl).embedUrl}
                                        title="Facebook video player" 
                                        frameBorder="0" 
                                        scrolling="no"
                                        allowTransparency="true"
                                        allow="encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <iframe 
                                        style={{ width: '100%', aspectRatio: '16/9', height: 'auto', border: 'none' }}
                                        src={getVideoDetails(formData.videoUrl).embedUrl}
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Button Text</label>
                            <input 
                                type="text" 
                                name="buttonText" 
                                value={formData.buttonText} 
                                onChange={handleInputChange} 
                                placeholder="e.g. Book Appointment"
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Button Link</label>
                            <input 
                                type="text" 
                                name="buttonLink" 
                                value={formData.buttonLink} 
                                onChange={handleInputChange} 
                                placeholder="e.g. /appointment"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Related Text (Optional small text below button)</label>
                        <input 
                            type="text" 
                            name="relatedText" 
                            value={formData.relatedText} 
                            onChange={handleInputChange} 
                            placeholder="e.g. 100% Secure & Confidential"
                        />
                    </div>

                    <div className="admin-form-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="admin-btn-primary">
                            <FiSave /> {isEditing ? 'Update Showcase' : 'Save Showcase'}
                        </button>
                        {isEditing && (
                            <button type="button" className="admin-btn-danger" onClick={handleDelete}>
                                <FiTrash2 /> Delete
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VideoShowcaseAdmin;
