import React, { useState } from 'react';
import Netsuite from '../../../assets/Netsuite.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('NetSuite')} target="_blank" rel="noopener noreferrer" href="https://system.netsuite.com/app/login/secure/enterpriselogin.nl?whence=">
        <img style={{ display: loaded ? "none" : "block" }} src={Netsuite} onLoad={() => setLoaded(false)} alt="Netsuite" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Log in to
          </h2>
        <h1>
          Oracle Netsuite
          </h1>
      </a>
    </div>
  );
}

export default Content;