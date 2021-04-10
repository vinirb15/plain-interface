import React, { useState } from 'react';
import DebitCard from '../../../assets/DebitCard.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('Debit Card')} target="_blank" rel="noopener noreferrer" href="https://system.fegllc.com/servicerequests">
        <img style={{ display: loaded ? "none" : "block" }} src={DebitCard} onLoad={() => setLoaded(false)} alt="Debit Card" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Click here to create your
          </h2>
        <h1>
          Debit Card and Game Related Ticket
          </h1>
      </a>
    </div>
  );
}

export default Content;