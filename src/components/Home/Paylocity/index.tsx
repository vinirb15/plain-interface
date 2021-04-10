import React, { useState } from 'react';
import Paylocity from '../../../assets/Paylocity.png';
import Loader from '../../Loader';
import '../PowerBI/styles.css';
import AnaliticsEvents from '../Analytics'

const Content = () => {

  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('Paylocity')} target="_blank" rel="noopener noreferrer" href="https://access.paylocity.com/">
        <img style={{ display: loaded ? "none" : "block" }} src={Paylocity} onLoad={() => setLoaded(false)} alt="PowerBI" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Log In to
          </h2>
        <h1>
          Paylocity
          </h1>
      </a>
    </div>
  );
}

export default Content;
