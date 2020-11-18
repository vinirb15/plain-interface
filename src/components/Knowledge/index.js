import React from 'react';
import { Link } from 'react-router-dom';

import KnowledgeBase from '../../assets/Knowledge.png';

import '../PowerBI/styles.css';

export default function Content() {

  return (
<div className="box-content images">
          <Link to="/">
            <img src={KnowledgeBase} alt="Knowledge Base" />
            <h2>
              Log In to FEG
          </h2>
            <h1>
              Knowledge Base
          </h1>
          </Link>
        </div>
  );
}