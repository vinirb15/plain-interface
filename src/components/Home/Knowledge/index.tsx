import React from 'react';

import KnowledgeBase from '../../../assets/Knowledge.png';

import '../PowerBI/styles.css';

const Content = () => {

  return (
<div className="box-content images">
          <a href="https://fegllc.zendesk.com/hc/en-us">
            <img src={KnowledgeBase} alt="Knowledge Base" />
            <h2>
              Log In to FEG
          </h2>
            <h1>
              Knowledge Base
          </h1>
          </a>
        </div>
  );
}

export default Content;
