import React from 'react';
import {Link} from 'react-router-dom';

import './nav-menu.css';

const ShipperNav = props => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <Link to={`/loads/create-load`} className="nav-menu__link">Create Load</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={`/loads/new-loads`} className="nav-menu__link">New Loads</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={`/loads/shipments`} className="nav-menu__link">Shipments</Link>
        </li>
        <li className="nav-menu__item">
          <Link to={`/loads/history`} className="nav-menu__link">History</Link>
        </li>
      </ul>
    </nav>
  );
};


export default ShipperNav;
