import React from 'react';
import { Link } from 'react-router-dom';

import KnowledgeBase from '../../assets/Knowledge.png';

import './styles.css';

export default function Content() {

  return (
    <div className="box-content images">
      <Link to="/">
        <img src={KnowledgeBase} alt="Create Ticket" />
        <h2>
          To FEG
          </h2>
        <h1>
          Create Your Ticket
          </h1>
      </Link>
    </div>
  );
}