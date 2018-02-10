import React from 'react';
import '../assets/scss/init.scss';

const Layout = ({ children }) => <div className="layout">{children()}</div>;

export default Layout;
