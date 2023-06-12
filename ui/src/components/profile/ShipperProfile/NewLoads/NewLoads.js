import React, {useEffect, useState} from 'react';

import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';
import NewLoadItem from './NewLoadItem(short)/NewLoadItem';
import ShipperNav from '../ShipperNav/ShipperNav';

import './new-loads.css';

const NewLoads = props => {

  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [newLoads, setNewLoads] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const receivedNewLoads = await request(`/loads/new-loads`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'UserId': storeData.userId
        });

        setNewLoads([
          ...newLoads,
          ...receivedNewLoads
        ])

      } catch(e) {
        console.log('Loads were not received', e)
      }
    }
    fetchData();
  }, []);


  return (
          <div className="section__layout">
            <ShipperNav/>
            <h1 className="section__title">My New Loads</h1>
            {newLoads.length !== 0 ? <ul className="new-loads__list">
              {newLoads.map(item => <NewLoadItem key={item._id} {...item}/>)}
            </ul> : <p className="new-loads__no-items">Yet no new loads:(</p> }

          </div>
  );
};

export default NewLoads;
