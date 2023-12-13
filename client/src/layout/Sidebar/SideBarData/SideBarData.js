import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as CgIcons from 'react-icons/cg';
import * as FcIcons from 'react-icons/fc';

// ### JSON Object
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Content',
    // path: '/',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Home',
        path: '/',
        icon: <FcIcons.FcSurvey />,
        cName: 'sub-nav',
      },
      {
        title: 'Get Request',
        path: '/get-request',
        icon: <FcIcons.FcSurvey />,
      },
      {
        title: 'Post Request',
        path: '/post-request',
        icon: <FcIcons.FcSurvey />,
      },
      {
        title: 'Delete Request',
        path: '/delete-request',
        icon: <FcIcons.FcSurvey />,
      },
      {
        title: 'Update Request',
        path: '/update-request',
        icon: <FcIcons.FcSurvey />,
      },
      {
        title: 'Register',
        path: '/register',
        icon: <FcIcons.FcSurvey />,
      },
      {
        title: 'Login',
        path: '/login',
        icon: <FcIcons.FcSurvey />,
      }
    ],
  },
 
];
export const SidebarDataAdmin = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <CgIcons.CgProfile />,
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: <GrIcons.GrContact />,
  },
  {
    title: 'Take a Survey',
    // path: '/',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Available Surveys',
        path: '/available-surveys',
        icon: <FcIcons.FcSurvey />,
        cName: 'sub-nav',
      },
      {
        title: 'Taken Results',
        path: '/taken-surveys',
        icon: <FcIcons.FcSurvey />,

      },
    ],
  },
 
];
