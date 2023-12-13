import React from 'react';
// import {Link} from 'react-router-dom';
import {FaFacebookSquare, FaGithub} from 'react-icons/fa';
// import {FaInstagram, FaTiktok, FaYoutube} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-blog">
      <div className="container-footer">

        {/* <div className="footer-e1">

          <Link className="footer-e1-a" style={{}} to="/">
            More
          </Link>

        </div>

        <div className="footer-e2">
          <Link className="footer-e1-a" style={{}} to="/">About</Link>
        </div>

        <div className="footer-e3">
          <Link className="footer-e1-a" style={{}} to="/help">Contact</Link>
        </div> */}

      </div>

      <div className="container-footer-row2">

        <div className="footer-e1-row2">

          <a
            aria-label="link"
            href="https://www.facebook.com"
            className="link-social-desktop"
          >
            <span><FaFacebookSquare /></span>
          </a>
          <a
            aria-label="link"
            href="https://github.com/s2seweis"
            className="link-social-desktop"
          >
            <span><FaGithub /></span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
