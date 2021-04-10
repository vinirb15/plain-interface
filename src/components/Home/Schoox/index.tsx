import React, { useState } from 'react';
import Schoox from '../../../assets/Schoox.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('Schoox')} target="_blank" rel="noopener noreferrer" href="https://www.schoox.com/login.php">
        <img style={{ display: loaded ? "none" : "block" }} src={Schoox} onLoad={() => setLoaded(false)} alt="Schoox" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Log In to
          </h2>
        <h1>
          Schoox
          </h1>
      </a>
    </div>
  );
}

export default Content;