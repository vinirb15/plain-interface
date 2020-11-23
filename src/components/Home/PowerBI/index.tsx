import React from 'react';

import PowerBI from '../../../assets/PowerBI.png';

import './styles.css';

const Content = () => {

  return (
    <div className="box-content images">
      <a href="https://app.powerbi.com/?noSignUpCheck=1">
        <img src={PowerBI} alt="PowerBI" />
        <h2>
          Log In to
          </h2>
        <h1>
        FEG Power BI
          </h1>
      </a>
    </div>
  );
}

export default Content;
