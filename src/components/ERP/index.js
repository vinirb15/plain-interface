import React from 'react';
import { Link } from 'react-router-dom';

import Displays from '../../assets/Displays.png';

import '../PowerBI/styles.css';

export default function Content() {

  return (
    <div className="box-content images">
      <Link to="/">
        <img src={Displays} alt="ERP" />
        <h2>
          Log In to FEG
          </h2>
        <h1>
          ERP
          </h1>
      </Link>
    </div>
  );
}