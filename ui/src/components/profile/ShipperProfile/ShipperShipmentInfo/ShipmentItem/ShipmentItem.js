import React from 'react';


const ShipmentItem = ({title, state}) => {

  return (
    <li className="shipments__item">
      <h2 className="shipments__item-title">{title}</h2>
      <div className="shipments__item-info">Current State: {state}</div>
    </li>
  );
};


export default ShipmentItem;
