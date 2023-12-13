import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SubMenu.css'; // Import the CSS file

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link to={item.path} className="sidebar-link" onClick={item.subNav && showSubnav}>
        <div className='flex-div' style={{display:'flex'}}>
          {item.icon}
          <span className="sidebar-label">{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link to={item.path} className="dropdown-link" key={index}>
              {item.icon}
              <span className="sidebar-label">{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

SubMenu.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    subNav: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
    iconOpened: PropTypes.node,
    iconClosed: PropTypes.node,
  }).isRequired,
};

export default SubMenu;
