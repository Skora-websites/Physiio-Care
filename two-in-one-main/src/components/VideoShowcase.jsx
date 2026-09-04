import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import '../styles/VideoShowcase.css';

const VideoShowcase = ({ websiteType }) => {
    const [showcase, setShowcase] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShowcase = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                const response = await axios.get(`${apiBaseUrl}/video-showcase/type/${websiteType}`);
                if (response.data.success) {
                    setShowcase(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching video showcase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShowcase();
    }, [websiteType]);

    const getVideoDetails = (url) => {
        if (!url) return null;
        
        // YouTube
        const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const ytMatch = url.match(ytRegExp);
        if (ytMatch && ytMatch[2].length === 11) {
            return { 
                type: 'youtube', 
                embedUrl: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[2]}` 
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

    if (loading || !showcase || !showcase.isActive) return null;

    const videoDetails = getVideoDetails(showcase.videoUrl);

    // We use a button block with Link if buttonLink starts with / or a function if it's 'Book Appointment' to open modal,
    // but the prompt says button and related text. We will use a link for simplicity, or handle 'openBookingModal' event.
    
    const handleButtonClick = (e) => {
        if (showcase.buttonLink === '/appointment' || showcase.buttonText?.toLowerCase().includes('book')) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('openBookingModal'));
        }
    };

    return (
        <section className={`video-showcase-section ${websiteType}-theme`}>
            <div className="container">
                <div className="video-showcase-grid">
                    {/* Left Side: Single video player */}
                    <div className="video-showcase-player">
                        {videoDetails ? (
                            videoDetails.type === 'instagram' ? (
                                <div className="instagram-video-wrapper">
                                    <iframe 
                                        src={videoDetails.embedUrl}
                                        title={showcase.title}
                                        frameBorder="0"
                                        scrolling="no"
                                        allowTransparency="true"
                                        allow="encrypted-media"
                                        className="video-iframe instagram-iframe"
                                    ></iframe>
                                </div>
                            ) : videoDetails.type === 'facebook' ? (
                                <iframe 
                                    src={videoDetails.embedUrl}
                                    title={showcase.title}
                                    frameBorder="0"
                                    scrolling="no"
                                    allowTransparency="true"
                                    allow="encrypted-media; picture-in-picture"
                                    allowFullScreen
                                    className="video-iframe facebook-iframe"
                                ></iframe>
                            ) : (
                                <iframe 
                                    src={videoDetails.embedUrl}
                                    title={showcase.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="video-iframe youtube-iframe"
                                ></iframe>
                            )
                        ) : (
                            <div className="video-placeholder">Invalid Video URL</div>
                        )}
                        <div className="video-player-glow"></div>
                    </div>

                    {/* Right Side: Dynamic content */}
                    <div className="video-showcase-content">
                        <div className="video-showcase-badge">
                            <FaPlay className="badge-icon" /> Featured Video
                        </div>
                        <h2 className="video-showcase-title">{showcase.title}</h2>
                        <p className="video-showcase-description">{showcase.description}</p>
                        
                        <div className="video-showcase-action">
                            {showcase.buttonLink && showcase.buttonLink.startsWith('http') ? (
                                <a href={showcase.buttonLink} target="_blank" rel="noopener noreferrer" className={`theme-btn ${websiteType}-btn`}>
                                    {showcase.buttonText} <FaArrowRight />
                                </a>
                            ) : (
                                <Link to={showcase.buttonLink} onClick={handleButtonClick} className={`theme-btn ${websiteType}-btn`}>
                                    {showcase.buttonText} <FaArrowRight />
                                </Link>
                            )}
                            
                            {showcase.relatedText && (
                                <span className="video-showcase-related-text">{showcase.relatedText}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
