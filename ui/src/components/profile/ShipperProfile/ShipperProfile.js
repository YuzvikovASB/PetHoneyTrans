import React from 'react';
import ShipperNav from './ShipperNav/ShipperNav';

const ShipperProfile = props => {
  return (
    <React.Fragment>
      <ShipperNav/>
      <h1 className="section__title">Welcome {props.user.name}!</h1>
    </React.Fragment>
  );
};

export default ShipperProfile;
