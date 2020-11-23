import React from 'react';

import Zendesk from '../../../assets/Zendesk.png';

import '../PowerBI/styles.css';

const Content = () => {

  return (
    <div className="box-content images">
      <a href="https://fegllc.zendesk.com/agent//">
        <img src={Zendesk} alt="Zendesk" />
        <h2>
          Log In to
          </h2>
        <h1>
        FEG Zendesk Management
          </h1>
      </a>
    </div>
  );
}

export default Content;
