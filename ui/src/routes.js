import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Profile from './components/profile/Profile';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ChangePassword from './components/profile/ChangePassword/ChangePassword';
import DeleteAccount from './components/profile/DeleteAccount/DeleteAccount';

import CreateLoad
  from './components/profile/ShipperProfile/CreateLoad/CreateLoad';
import NewLoads from './components/profile/ShipperProfile/NewLoads/NewLoads';
import ShipperShipmentInfo
  from './components/profile/ShipperProfile/ShipperShipmentInfo/ShipperShipmentInfo';
import NewLoadItemFull
  from './components/profile/ShipperProfile/NewLoads/NewLoadItem(full)/NewLoadItemFull';
import CreateTruck
  from './components/profile/DriverProfile/CreateTruck/CreateTruck';
import MyTrucks from './components/profile/DriverProfile/MyTrucks/MyTrucks';
import TruckItemFull
  from './components/profile/DriverProfile/MyTrucks/TruckItme(full)/TruckItemFull';
import DriverShipmentInfo
  from './components/profile/DriverProfile/DriverShipmentInfo/DriverShipmentInfo';
import LoadsHistory
  from './components/profile/ShipperProfile/LoadsHistory/LoadsHistory';
import DeliveryHistory
  from './components/profile/DriverProfile/DeliveryHistory/DeliveryHistory';


const useRoutes = (isAuthenticated, userId, userRole) => {

  if(!isAuthenticated) {
    return (
      <React.Fragment>
        <Header isAuthenticated={isAuthenticated} userId={userId} userRole={userRole}/>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
          <Redirect to="/" />
        </Switch>
        <Footer/>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Header isAuthenticated={isAuthenticated} userId={userId} userRole={userRole}/>
      <Switch>
        <Route path={`/profile/:id`} exact component={Profile} />}/>
        <Route path={`/profile/:id/change-password`} exact component={ChangePassword}/>
        <Route path={`/profile/:id/delete-account`} exact component={DeleteAccount}/>

        <Route path={`/loads/create-load`} exact component={CreateLoad}/>
        <Route path={`/loads/new-loads`} exact component={NewLoads}/>
        <Route path={`/loads/shipments`} exact component={ShipperShipmentInfo}/>
        <Route path={`/loads/history`} exact component={LoadsHistory}/>
        <Route path={`/loads/:id`} exact component={NewLoadItemFull}/>

        <Route path={`/trucks/create-truck`} exact component={CreateTruck}/>
        <Route path={`/trucks/my-trucks`} exact component={MyTrucks}/>
        <Route path={`/trucks/shipments`} exact component={DriverShipmentInfo}/>
        <Route path={`/trucks/history`} exact component={DeliveryHistory}/>
        <Route path={`/trucks/:id`} exact component={TruckItemFull}/>

        <Route path="/" exact component={Main} />
      </Switch>
      <Footer/>
    </React.Fragment>
  );

};


export default useRoutes;
