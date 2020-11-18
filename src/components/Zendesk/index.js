import React from 'react';
import { Link } from 'react-router-dom';

import Zendesk from '../../assets/Zendesk.png';

import '../PowerBI/styles.css';

export default function Content() {

  return (
    <div className="box-content images">
      <Link to="/">
        <img src={Zendesk} alt="Zendesk" />
        <h2>
          Log In to FEG
          </h2>
        <h1>
          Zendesk Management
          </h1>
      </Link>
    </div>
  );
}