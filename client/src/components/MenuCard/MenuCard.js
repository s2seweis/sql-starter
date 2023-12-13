// MenuCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCard.css';

const MenuCard = ({ title, link, imageSrc }) => {
    return (
        <div className="menu-card">
            <Link to={link}>
                <img src={imageSrc} alt={"placeholder"} />
                <h3>{title}</h3>
            </Link>
        </div>
    );
};

export default MenuCard;
