import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import { FaArrowLeft } from 'react-icons/fa';
import './Layout.css';

const Layout = ({ children, basketApi, handleRemoveFromBasket, handleIncreaseQuantity, handleDecreaseQuantity }) => {
  // console.log("line:100", children);
  // console.log("line:200", basketApi);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [visible, setVisible] = useState(true);
  const [style, setStyle] = useState('overlay');

  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      setVisible(currentScrollTop <= 100 || currentScrollTop < lastScrollTop);
      lastScrollTop = currentScrollTop <= 100 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    // Add your logic for setting styles if needed
    setStyle('overlay2');
  };

  const toggleHideSidebar = () => {
    setIsOpen(!isOpen);
    // Add your logic for setting styles if needed
    setStyle('overlay');
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="layout-container">
      <div
        className={visible ? 'visible-style' : 'hidden-style'}
        onClick={toggleHideSidebar}
      />

      <div className={style} onClick={toggleHideSidebar} />
      <div className="layout-content">
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          toggleHideSidebar={toggleHideSidebar}
        />
        <Navbar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          sidebar={sidebar}
          setSidebar={setSidebar}
          toggleHideSidebar={toggleHideSidebar}
          visible={visible}
          basketApi={basketApi}
          handleRemoveFromBasket={handleRemoveFromBasket}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
        />
        {/* <button className="go-back" onClick={goBack}>
          Go Back
        </button> */}
        <button className="go-back" onClick={goBack}>
          <FaArrowLeft />
        </button>
        {children}
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
