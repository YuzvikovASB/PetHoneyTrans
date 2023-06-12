import React, {useEffect, useState} from 'react';

import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';
import TruckItemShort from './TruckItem(short)/TruckItemShort';

import './my-trucks.css';
import DriverNav from '../DriverNav/DriverNav';


const MyTrucks = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [myTrucks, setMyTrucks] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const trucks = await request(`/trucks/my-trucks`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'UserId': storeData.userId
        });

        setMyTrucks([
          ...myTrucks,
          ...trucks
        ])

      } catch(e) {
        console.log('Trucks were not received', e)
      }
    }
    fetchData();
  }, []);


  return (

    <div className="section__layout">
      <DriverNav/>
      <h1 className="section__title">My Trucks</h1>
      {myTrucks.length !== 0 ? <ul className="trucks__list">
        {myTrucks.map(item => <TruckItemShort key={item._id} {...item}/>)}
      </ul> : <p className="trucks__no-items">Yet no new trucks:(</p> }

    </div>

  );
};

export default MyTrucks;
