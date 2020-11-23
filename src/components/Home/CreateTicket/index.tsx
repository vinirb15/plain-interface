import React from 'react';

import CreateTicket from '../../../assets/CreateTicket.png';

import '../PowerBI/styles.css';

const Content = () => {

  return (
    <div className="box-content images">
      <a href="https://fegllc.zendesk.com/hc/en-us/requests/new">
        <img src={CreateTicket} alt="Create Ticket" />
        <h2>
          FEG Ticket
          </h2>
        <h1>
          Create Your Ticket
          </h1>
      </a>
    </div>
  );
}

export default Content;
