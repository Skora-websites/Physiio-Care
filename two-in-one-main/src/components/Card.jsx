import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '../context/PlatformContext';

const Card = ({ id, title, iconEmoji, description, stats, btnText, label, link, themeClass }) => {
  const navigate = useNavigate();
  const { selectPlatform } = usePlatform();

  const handleCardClick = (e) => {
    e.preventDefault();
    selectPlatform(id); // Assign the exact platform context
    navigate(link);     // Safely transport the user
  };

  return (
    <div className={`d13-blob-unit ${themeClass}`}>
      <div className="d13-blob">
        <div className="d13-blob-icon">{iconEmoji}</div>
        <div className="d13-blob-title">{title}</div>
        <p className="d13-blob-desc">
          {description}
        </p>

        {stats && (
          <div className="d13-blob-stats">
            {stats.map((stat, index) => (
              <div key={index}>
                <span className="d13-bstat-val">{stat.val}</span><br />
                {stat.label}
              </div>
            ))}
          </div>
        )}

        <button className="d13-blob-btn" onClick={handleCardClick}>{btnText}</button>
      </div>
      <div className="d13-blob-label">{label}</div>
    </div>
  );
};

export default Card;
