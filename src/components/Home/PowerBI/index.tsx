import React, { useState } from 'react';
import PowerBI from '../../../assets/PowerBI.png';
import Loader from '../../Loader';
import './styles.css';
import AnaliticsEvents from '../Analytics'

const Content = () => {

  const [loaded, setLoaded] = useState(true);

  function myFunction() {
    var n = navigator.userAgent.toString();
    if (n.search("iPad") !== -1) {
      if (window.confirm("Open Power BI app?") === true) {
        window.location.href = "mspbi://app/"
      } else {
        window.open("https://app.powerbi.com", '_blank')
      }
    }
    if (n.search("Android") !== -1) {
      if (window.confirm("Open Power BI app?") === true) {
        window.location.href = "mspbi://app/"
      } else {
        window.open("https://app.powerbi.com", '_blank')
      }
    }
    if (n.search("iPhone") !== -1) {
      if (window.confirm("Open Power BI app?") === true) {
        window.location.href = "mspbi://app/"
      } else {
        window.open("https://app.powerbi.com", '_blank')
      }
    }
    else {
      window.open("https://app.powerbi.com", '_blank')
    }
  }

  return (
    <div onClick={() => {myFunction(); AnaliticsEvents('PowerBI')}} className="box-content images">
        <img style={{ display: loaded ? "none" : "block" }} src={PowerBI} onLoad={() => setLoaded(false)} alt="PowerBI" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <h2>
          Log In to
          </h2>
        <h1>
          FEG Power BI
          </h1>
    </div>
  );
}

export default Content;