import React, { useState } from 'react';
import KnowledgeBase from '../../../assets/Knowledge.png';
import Loader from '../../Loader';
import '../PowerBI/styles.css';
import AnaliticsEvents from '../Analytics'

const Content = () => {
  const [loaded, setLoaded] = useState(true);
  
  return (
<div className="box-content images">
          <a onClick={() => AnaliticsEvents('Knowkedge Base')} target="_blank" rel="noopener noreferrer" href="https://fegllc.zendesk.com/hc/en-us">
            <img style={{display: loaded ? "none" : "block"}} src={KnowledgeBase} onLoad={() => setLoaded(false)} alt="Knowledge Base" />
            {
          (loaded ? <Loader /> : <></>)
        }
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
