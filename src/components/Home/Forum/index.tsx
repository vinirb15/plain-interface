import React, { useState } from 'react';
import Forum from '../../../assets/Forum.png';
import Loader from '../../Loader';
import '../PowerBI/styles.css';
import AnaliticsEvents from '../Analytics'

const Content = () => {

  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('Forum')} target="_blank" rel="noopener noreferrer" href="https://fegllc.zendesk.com/hc/en-us/community/topics">
        <img style={{ display: loaded ? "none" : "block" }} src={Forum} onLoad={() => setLoaded(false)} alt="PowerBI" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Log In to FEG
          </h2>
        <h1>
          Forum
          </h1>
      </a>
    </div>
  );
}

export default Content;
