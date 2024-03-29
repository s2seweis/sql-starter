import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaAlignJustify } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { userDropdownItems, adminDropdownItems } from './DropDownItems'; // Import the dropdown items
import Button from 'react-bootstrap/Button';
import classnames from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
// import Logout from '../../components/Auth/Logout/Logout';
import pageLinks from '../../constants/links';
// import {useSelector} from 'react-redux';
import './Navbar.css';
import '../../styles/bootstrap.css';

import logo from '../../assets/logo.png';
import LogoutButton from '../../components/Authentication/LogoutButton/LogoutButton';
import Basket from '../../components/Basket/Basket';

const Navbar = ({
  isOpen,
  toggleSidebar,
  toggleHideSidebar,
  sidebar,
  setSidebar,
  visible,
  basketApi,
  handleRemoveFromBasket,
  handleIncreaseQuantity,
  handleDecreaseQuantity
}) => {

  const [style1, setStyle] = useState('overlay');
  // console.log("line:300", basketApi);

  const hideSidebar = () => {
    setSidebar(!sidebar);
    setStyle('overlay');
  };
  // console.log("line:555", hideSidebar);

  return (
    <nav
      style={{ zIndex: '5' }}
      className={classnames('navbar', { 'navbar--hidden': !visible })}
    >
      <div className={style1} onClick={hideSidebar} />
      <div className="nav-center">
        <div className="nav-header">

          <h2 className="h2-nav-title" style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: 'auto', fontSize: 'revert' }}>
            <Link to="/">
              <img className="logo-img" src={logo} alt="Logo" />
            </Link>
          </h2>
        </div>

        <div style={{ marginLeft: '10px' }} className="nav-title">
          <Button
            className="toggle-btn"
            onClick={isOpen ? toggleHideSidebar : toggleSidebar}
          >
            <FaAlignJustify />
          </Button>

        </div>

        <h5 style={{ width: "65%", marginTop: "10px" }}>React & Postgre SQL</h5>

        <Basket
          basketApi={basketApi}
          handleRemoveFromBasket={handleRemoveFromBasket}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
        />


        <div className="nav-links" style={{ alignItems: 'center' }}>

          <Dropdown>
            <Dropdown.Toggle
              style={{ fontSize: '' }}
              id="dropdown-basic"
              className="navbar-dropdown"
            >
              Overview
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '-webkit-fill-available', marginLeft: "-30px" }}>
              {userDropdownItems.map(item => (
                <Dropdown.Item key={item.id} style={{}}>
                  <Link to={item.url} style={{ marginLeft: '0px', display: "flex", justifyContent: "center" }}>
                    {item.icon && <span style={{ marginRight: '5px' }}>{item.icon}</span>}
                    {item.text}
                  </Link>
                </Dropdown.Item>
              ))}
              <Dropdown.Item
                style={{ justifyContent: 'center', display: 'flex' }}
                href="#/action-3"
              >
                <LogoutButton />

              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Sidebar />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  // toggleHideSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
  setSidebar: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Navbar;
