import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useHttp} from '../../../../../hooks/http.hook';
import {useMessage} from '../../../../../hooks/message.hook';
import EditTruck from '../../EditTruck/EditTruck';
import DriverNav from '../../DriverNav/DriverNav';

import './truck-item-full.css';

const TruckItemFull = props => {

  const history = useHistory();
  const storageName = 'userData';
  const storeData = JSON.parse(localStorage.getItem(storageName));
  const pathname = window.location.pathname;
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [editForm, setEditForm] = useState(false);

  const [truck, setTruck] = useState({
    model: '',
    type: '',
    assignedTo: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData() {
      try {
        const receivedTruck = await request(`${pathname}`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token
        });

        setTruck({
          ...truck,
          model: receivedTruck.model,
          type: receivedTruck.type,
          assignedTo: receivedTruck.assignedTo,
        });


      } catch(e) {
        console.log('Truck was not received', e)
      }
    }
    fetchData();
  }, []);

  const editTruckHandler = () => {
    setEditForm(!editForm);
  };

  const onEditedTruck = (editedTruck) => {

    setTruck({
      ...truck,
      model: editedTruck.model,
      type: editedTruck.type,
    });
    setEditForm(false);

  };

  const deleteTruckHandler = async () => {
    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`${pathname}`, 'DELETE', null, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Truck was deleted!");
      history.push('/trucks/my-trucks');

    } catch(e) {
      console.log('Truck was not deleted', e);
      history.push('/trucks/my-trucks');
    }
  };


  const assignTruckHandler = async () => {
    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`${pathname}/assign`, 'PATCH', {userId: storeData.userId}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Truck was assigned!");
      history.push('/trucks/my-trucks');

    } catch(e) {
      console.log('Truck was not assigned', e)
    }
  };

  const reassignTruckHandler = async () => {
    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`${pathname}/reassign`, 'PATCH', {userId: storeData.userId}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Truck was reassigned!");
      history.push('/trucks/my-trucks');

    } catch(e) {
      console.log('Truck was not reassigned', e)
    }
  };

  const buttonLayout = (assigned) => {

    if (assigned === '') {
      return (
        <React.Fragment>
          <div className="full-truck__button-container">
            <button
              className="trucks__item-button full-truck__button"
              onClick={deleteTruckHandler}>Delete</button>
            <button
              className="trucks__item-button full-truck__button"
              onClick={editTruckHandler}>Edit</button>
            <button
              className="trucks__item-button full-truck__button"
              onClick={assignTruckHandler}>Assign</button>
          </div>
            { editForm ? <EditTruck onEditedTruck={onEditedTruck} {...truck}/> : ''}
        </React.Fragment>
      )
    } else {
      return <button
        className="trucks__item-button full-truck__button"
        onClick={reassignTruckHandler}>Reassign</button>
    }

  };

  return (
    <div className="section__layout">
      <DriverNav/>
      <h1 className="section__title">{truck.model}</h1>
      <div className="full-truck__parameter">
        Type: {truck.type}
      </div>
      {buttonLayout(truck.assignedTo)}
    </div>
  );
};


export default TruckItemFull;
