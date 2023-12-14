import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { SidebarData, SidebarDataAdmin } from './SideBarData/SideBarData';
import SubMenu from './SideBarData/SubMenu';
// import Logout from '../../components/Auth/Logout/Logout';
import '../Sidebar/Sidebar.css';
import './Sidebar.css';
import LogoutButton from '../../components/Authentication/LogoutButton/LogoutButton';

const Sidebar = ({ isOpen, toggleSidebar, toggleHideSidebar }) => {
  // const userData = useSelector(state => state.user.userData);
  // const isAdmin = userData?.user === 'admin';

  return (
    <aside className={isOpen ? 'sidebar show-sidebar' : 'sidebar'}>
      <button
        style={{ fontSize: '1rem' }}
        className="close-btn"
        alt="close"
        type="button"
        onClick={isOpen ? toggleHideSidebar : toggleSidebar}
      >
        <FaTimes />
      </button>
      <div className="side-container">
        {
          SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        {/* {isAdmin
          ? SidebarDataAdmin.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })
          : SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })} */}
        <div className="sidebar-social-links-margin">
          <LogoutButton/>
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  // isOpen: PropTypes.bool.isRequired,
  // toggleSidebar: PropTypes.func.isRequired,
  // toggleHideSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
