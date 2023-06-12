import React from 'react';
import {Link} from 'react-router-dom';

import './nav-menu.css';

const DriverNav = props => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <Link to={`/trucks/create-truck`} className="nav-menu__link">Create Truck</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={`/trucks/my-trucks`} className="nav-menu__link">My Trucks</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={`/trucks/shipments`} className="nav-menu__link">Shipments</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={`/trucks/history`} className="nav-menu__link">History</Link>
        </li>
      </ul>
    </nav>
  );
};


export default DriverNav;
