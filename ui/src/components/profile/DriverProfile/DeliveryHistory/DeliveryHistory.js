import React, {useEffect, useState} from 'react';
import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';
import DriverNav from '../DriverNav/DriverNav';
import DeliveryHistoryItem from './DeliveryHistoryItem/DeliveryHistroyItem';


const DeliveryHistory = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [shippedLoads, setShippedLoads] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const receivedLoads = await request(`/trucks/history`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'UserId': storeData.userId
        });

        setShippedLoads([
          ...shippedLoads,
          ...receivedLoads
        ])

      } catch(e) {
        console.log('Loads were not received', e)
      }
    }
    fetchData();
  }, []);


  return (
    <div className="section__layout">
      <DriverNav/>
      <h1 className="section__title">History</h1>
      {shippedLoads.length !== 0 ? <ul className="shipments__list">
        {shippedLoads.map(item => <DeliveryHistoryItem key={item._id} {...item}/>)}
      </ul> : <p className="shipments__no-items">History is empty</p> }
    </div>
  );
};

export default DeliveryHistory;
