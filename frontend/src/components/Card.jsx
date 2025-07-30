import React from 'react';
import '../styles/Card.css'; // Create this CSS if you use this component

const Card = ({ title, children }) => {
    return (
        <div className="card">
            {title && <h3 className="card-title">{title}</h3>}
            <div className="card-content">{children}</div>
        </div>
    );
};

export default Card;