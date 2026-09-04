import React, { useEffect, useState } from 'react';
import api from '../admin/utils/api';
import { getImageUrl } from '../utils/imageUrl';
import { FaPlayCircle } from 'react-icons/fa';
import '../styles/VideosGallery.css';

const VideosGallery = ({ websiteType }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await api.get(`/videos/type/${websiteType}`);
                // Only show active videos, though we didn't filter by isActive in backend so we do it here or assume all are active.
                setVideos(data.filter(v => v.isActive));
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [websiteType]);

    if (loading || videos.length === 0) return null;

    const renderVideo = (video) => {
        if (video.type === 'link' && video.videoUrl) {
            const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const ytMatch = video.videoUrl.match(ytRegExp);
            if (ytMatch && ytMatch[2].length === 11) {
                return (
                    <iframe 
                        className="video-frame"
                        src={`https://www.youtube.com/embed/${ytMatch[2]}`}
                        title={video.title}
                        allowFullScreen
                    ></iframe>
                );
            }
            return (
                <div className="video-placeholder">
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link">
                        <FaPlayCircle size={40} />
                        <span>Watch Video</span>
                    </a>
                </div>
            );
        } else if (video.type === 'upload' && video.videoUrl) {
            return (
                <video 
                    className="video-frame"
                    src={getImageUrl(video.videoUrl)}
                    controls
                    preload="metadata"
                ></video>
            );
        }
        return null;
    };

    return (
        <section className={`videos-gallery-section ${websiteType === 'doctor' ? 'doc-theme' : 'pz-theme'}`}>
            <div className="container">
                <h2 className="section-title">Video Gallery</h2>
                <p className="section-subtitle">Watch our latest videos and moments.</p>
                <div className="videos-grid">
                    {videos.map(video => (
                        <div key={video._id} className="video-card">
                            <div className="video-wrapper">
                                {renderVideo(video)}
                            </div>
                            <div className="video-info">
                                <h4 className="video-title">{video.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideosGallery;
