import React from 'react';

import './main.css'
const Main = props => {
  return (
    <div>
      <section className="intro">
        <div className="intro__container">
          <h1 className="intro__title">
            Welcome To HoneyTrans Application!
          </h1>
          <p className="intro__subtitle">
            Register to join our community.
            Create shipper account to start shipping your honey today.
            Create driver account if you want to transport our awesome honey.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Main;
