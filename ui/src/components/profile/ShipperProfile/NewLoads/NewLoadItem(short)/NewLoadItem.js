import React from 'react';
import { useHistory } from 'react-router-dom';

const NewLoadItem = ({_id, title, payload}) => {

  const history = useHistory();

  const showNewLoadHandler = () => {

    history.push(`/loads/${_id}`);
  };

  return (
    <li className="new-loads__item">
      <h2 className="new-loads__item-title">{title}</h2>
      <div className="new-loads__item-info">
        Payload: {payload}
      </div>
      <button
        className="new-loads__item-button"
        onClick={showNewLoadHandler}>View Details</button>
    </li>
  );
};

export default NewLoadItem;
