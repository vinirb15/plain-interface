import React from 'react';
import { Link } from 'react-router-dom';

import PowerBI from '../../assets/PowerBI.png';

import './styles.css';

export default function Content() {

  return (
    <div className="box-content images">
      <Link to="/">
        <img src={PowerBI} alt="PowerBI" />
        <h2>
          Log In to FEG
          </h2>
        <h1>
          Power BI
          </h1>
      </Link>
    </div>
  );
}