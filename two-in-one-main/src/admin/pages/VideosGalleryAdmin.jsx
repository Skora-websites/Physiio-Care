import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiEdit, FiTrash2, FiPlus, FiVideo } from 'react-icons/fi';
import { getImageUrl } from '../../utils/imageUrl';

const VideosGalleryAdmin = ({ websiteType }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', type: 'upload', videoUrl: '' });
    const [videoFile, setVideoFile] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, [websiteType]);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/videos/type/${websiteType}`);
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingId(item._id);
            setFormData({ title: item.title, type: item.type, videoUrl: item.videoUrl || '' });
        } else {
            setEditingId(null);
            setFormData({ title: '', type: 'upload', videoUrl: '' });
        }
        setVideoFile(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            try {
                await api.delete(`/videos/${id}`);
                fetchVideos();
            } catch (error) {
                console.error('Error deleting video:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('type', formData.type);
        submitData.append('websiteType', websiteType);
        
        if (formData.type === 'link') {
            submitData.append('videoUrl', formData.videoUrl);
        } else if (videoFile) {
            submitData.append('video', videoFile);
        }

        try {
            if (editingId) {
                await api.put(`/videos/${editingId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await api.post('/videos', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            setIsModalOpen(false);
            fetchVideos();
        } catch (error) {
            console.error('Error saving video:', error);
            alert('Failed to save video');
        }
    };

    const renderVideoPreview = (video) => {
        if (video.type === 'link' && video.videoUrl) {
            const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const ytMatch = video.videoUrl.match(ytRegExp);
            if (ytMatch && ytMatch[2].length === 11) {
                return (
                    <iframe 
                        style={{ width: '100%', height: '150px', border: 'none' }}
                        src={`https://www.youtube.com/embed/${ytMatch[2]}`}
                        title={video.title}
                        allowFullScreen
                    ></iframe>
                );
            }
            // Add other embed logic here if necessary
            return <div style={{ width: '100%', height: '150px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>External Video</div>;
        } else if (video.type === 'upload' && video.videoUrl) {
            return (
                <video 
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    src={getImageUrl(video.videoUrl)}
                    controls
                ></video>
            );
        }
        return <div style={{ width: '100%', height: '150px', background: '#f3f4f6' }}></div>;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>{websiteType === 'doctor' ? 'Doctor' : "Let's Play Zone"} Videos Gallery</h2>
                <button className="admin-btn" style={{ width: 'auto' }} onClick={() => handleOpenModal()}>
                    <FiPlus /> Add Video
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {videos.map(item => (
                    <div key={item._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                        {renderVideoPreview(item)}
                        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.875rem', color: '#4b5563', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold' }}>{item.title}</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => handleOpenModal(item)} style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}><FiEdit /></button>
                                <button onClick={() => handleDelete(item._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FiTrash2 /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {videos.length === 0 && <p style={{ color: '#6b7280' }}>No videos found.</p>}
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
                        <h3>{editingId ? 'Edit Video' : 'Add Video'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <input type="text" className="admin-input" placeholder="Video Title *" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            
                            <select className="admin-input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option value="upload">Upload Video File</option>
                                <option value="link">External Video Link (YouTube, Vimeo)</option>
                            </select>

                            {formData.type === 'link' ? (
                                <input type="url" className="admin-input" placeholder="Video URL *" value={formData.videoUrl} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} required />
                            ) : (
                                <input type="file" className="admin-input" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} required={!editingId && formData.type === 'upload'} />
                            )}
                            
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

export default VideosGalleryAdmin;
