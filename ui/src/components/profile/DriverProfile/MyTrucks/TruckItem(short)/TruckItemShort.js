import React from 'react';
import { useHistory } from 'react-router-dom';

const TruckItemShort = ({_id, model, assignedTo}) => {

  const history = useHistory();

  const showTruckHandler = () => {
    history.push(`/trucks/${_id}`);
  };

  const cls = ['trucks__item'];

  if(assignedTo) {
    cls.push('isAssigned');
  }

  return (
    <li className={cls.join(' ')}>
      <h2 className="trucks__item-title">{model}</h2>

      <button
        className="trucks__item-button"
        onClick={showTruckHandler}>View Details</button>
    </li>
  );
};

export default TruckItemShort;
