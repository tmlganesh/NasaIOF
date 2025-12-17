
import React from 'react';

const ImageReveal = ({ data, loading, onRestart }) => {
    if (loading) {
        return (
            <div className="loading-fullscreen">
                <div className="loading-text">Searching the Cosmos...</div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="image-reveal-fullscreen fade-in" style={{ backgroundImage: `url(${data.imageUrl})` }}>
            <div className="overlay-gradient"></div>

            <button className="back-btn-floating" onClick={onRestart}>
                &larr; Search Another Date
            </button>

            <div className="date-badge">{data.date}, {data.year}</div>

            <div className="content-panel">
                <h1 className="reveal-title">{data.title}</h1>
                <p className="reveal-desc">{data.description}</p>
                {data.infoUrl && (
                    <a href={data.infoUrl} target="_blank" rel="noopener noreferrer" className="reveal-link">
                        Read Full Story &rarr;
                    </a>
                )}
            </div>
        </div>
    );
};

export default ImageReveal;
