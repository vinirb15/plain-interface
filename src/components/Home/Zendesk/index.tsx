import React, { useState } from 'react';
import Zendesk from '../../../assets/Zendesk.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('Zendesk Management')} target="_blank" rel="noopener noreferrer" href="https://fegllc.zendesk.com/agent//">
        <img style={{display: loaded ? "none" : "block"}} src={Zendesk} onLoad={() => setLoaded(false)} alt="Zendesk" />
        {
          (loaded ? <Loader /> : <></>)
        }
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
