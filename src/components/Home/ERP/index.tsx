import React from 'react';

import Displays from '../../../assets/Displays.png';

import '../PowerBI/styles.css';

const Content = () => {

  return (
    <div className="box-content images">
      <a href="http://system.fegllc.com/">
        <img src={Displays} alt="ERP" />
        <h2>
          Log In to
          </h2>
        <h1>
        FEG ERP
          </h1>
      </a>
    </div>
  );
}

export default Content;
