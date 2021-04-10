import React, { useState } from 'react';
import Plataforms from '../../../assets/Plataforms.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-content images">
      <a onClick={() => AnaliticsEvents('Website and Platforms Related Ticket')} target="_blank" rel="noopener noreferrer" href="https://fegllc.zendesk.com/hc/en-us/requests/new">
        <img style={{ display: loaded ? "none" : "block" }} src={Plataforms} onLoad={() => setLoaded(false)} alt="Plataforms" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Click here to create your
          </h2>
        <h1>
          Website and Platforms Related Ticket
          </h1>
      </a>
    </div>
  );
}

export default Content;
