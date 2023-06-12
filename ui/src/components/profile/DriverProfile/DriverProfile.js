import React from 'react';
import DriverNav from './DriverNav/DriverNav';

import './driver-profile.css'

const DriverProfile = props => {
  return (
    <React.Fragment>
      <DriverNav/>
      <h1 className="section__title">Welcome {props.user.name}!</h1>
    </React.Fragment>

  );
};

export default DriverProfile;
