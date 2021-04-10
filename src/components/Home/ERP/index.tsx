import React, { useState } from 'react';
import Displays from '../../../assets/Displays.png';
import Loader from '../../Loader';
import '../PowerBI/styles.css';
import AnaliticsEvents from '../Analytics'

const Content = () => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('ERP')} target="_blank" rel="noopener noreferrer" href="http://system.fegllc.com/">
        <img style={{display: loaded ? "none" : "block"}} src={Displays} onLoad={() => setLoaded(false)} alt="ERP" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Log In to
          </h2>
        <h1>
        FEG ERP
          </h1>
      </a>
    </div>
  );
}

export default Content;
