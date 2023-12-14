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


const MenuCard1 = ({ title, href, imageSrc }) => {
    return (
        <div className="menu-card">
            <a href={href}>
                <img src={imageSrc} alt={"placeholder"} />
                <h3>{title}</h3>
            </a>
        </div>
    );
};

export { MenuCard, MenuCard1 };
