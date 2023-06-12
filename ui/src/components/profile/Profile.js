import React, {useEffect, useState} from 'react';
import {useHttp} from '../../hooks/http.hook';

import ShipperProfile from './ShipperProfile/ShipperProfile';
import DriverProfile from './DriverProfile/DriverProfile';


const Profile = props => {

  const { request } = useHttp();

  const storageName = 'userData';

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  });


  useEffect(() => {
    async function fetchData() {
      try {
        const storeData = JSON.parse(localStorage.getItem(storageName));

        const user = await request(`/profile/${storeData.userId}`, 'GET', null, {
          'Content-Type': 'application/json',
          'Authorization': storeData.token,
          'Role': storeData.role,
        });

        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })

      } catch(e) {
        console.log('Something went wrong', e);
      }
    }
    fetchData();
  }, [request]);




  return (
    <div className="section__layout">
      {user.role === 'driver' ? <DriverProfile user={user}/> : <ShipperProfile user={user}/>}
      <div>
        <img src={process.env.PUBLIC_URL + '/images/profile/no-photo.png'} alt="My Avatar on Main Profile" />
        <figcaption>{user.email}</figcaption>
      </div>
    </div>
  );
};

export default Profile;
