import React from 'react';
import { Link } from 'react-router-dom';

import CreateTicket from '../../../assets/CreateTicket.png';

import '../PowerBI/styles.css';

export default function Content() {

  return (
    <div className="box-content images">
      <Link to="/">
        <img src={CreateTicket} alt="Create Ticket" />
        <h2>
          FEG Ticket
          </h2>
        <h1>
          Create Your Ticket
          </h1>
      </Link>
    </div>
  );
}