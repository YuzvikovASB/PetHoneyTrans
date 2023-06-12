import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';
import DriverNav from '../DriverNav/DriverNav';

const CreateTruck = props => {

  const history = useHistory();
  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    model: '',
    type: 'sprinter',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);


  const createTruckHandler = async (e) => {
    e.preventDefault();

    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`/trucks/create-truck`, 'POST', {...form, userId: storeData.userId}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Truck was created!");
      history.push(`/trucks/my-trucks`);

    } catch(e) {
      console.log('Truck was not created', e)
    }
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
    })
  };


  return (
    <div className="section__layout">
      <DriverNav/>
      <h1 className="section__title">Create Truck</h1>
      <form
        onSubmit={createTruckHandler}
        className="form">
        <div className="form__container">
          <label htmlFor="truck-model" className="form__label">Model</label>
          <input
            required
            placeholder="Porsche-911"
            id="truck-model"
            type="text"
            name="model"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="truck-type"
                 className="form__label">Role</label>
          <select
            id="truck-type"
            name="type"
            className="form__input"
            onChange={changeHandler}
          >
            <option value="sprinter">sprinter (300x250x170, 1700)</option>
            <option value="small">small straight (500x250x170, 2500)</option>
            <option value="large">large straight (700x350x200, 4000)</option>
          </select>
        </div>


        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            Create Truck
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTruck;
