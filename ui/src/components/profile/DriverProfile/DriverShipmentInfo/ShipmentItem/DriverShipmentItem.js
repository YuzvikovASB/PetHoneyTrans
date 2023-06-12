import React, {useEffect} from 'react';
import {useHttp} from '../../../../../hooks/http.hook';
import {useMessage} from '../../../../../hooks/message.hook';

const DriverShipmentItem = ({_id, title, state, logs}) => {

  const {request, error, clearError} = useHttp();
  const storageName = 'userData';
  const storeData = JSON.parse(localStorage.getItem(storageName));
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);



  const pickUpHandler = async () => {

    try {
      await request(`/trucks/shipments/pick-up`, 'PATCH', {loadId: _id, logs: logs}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("You picked up the load! Now you need to deliver it!");

    } catch(e) {
      console.log('Load was not picked up', e)
    }

  };

  const deliverHandler = async () => {
    try {
      await request(`/trucks/shipments/delivered`, 'PATCH', {userId: storeData.userId, loadId: _id, logs: logs}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("You delivered the load! Nice job!");

    } catch(e) {
      console.log('Load was not picked up', e)
    }
  };


  return (
    <li className="shipments__item">
      <h2 className="shipments__item-title">{title}</h2>
      <div className="shipments__item-info">Current State: {state}</div>
      <button
        onClick={pickUpHandler}
        className="trucks__item-button shipments__item-button">Pick Up</button>
      <button
        onClick={deliverHandler}
        className="trucks__item-button shipments__item-button">Deliver</button>
    </li>

  );
};


export default DriverShipmentItem;
