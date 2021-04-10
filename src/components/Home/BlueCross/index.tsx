import React, { useState } from 'react';
import BlueCross from '../../../assets/BlueCross.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
    const [loaded, setLoaded] = useState(true);

    return (
        <div className="box-content images">
            <a onClick={() => AnaliticsEvents('Blue Cross')} target="_blank" rel="noopener noreferrer" href=" https://members.hcsc.net/wps/portal/bam">
                <img style={{ display: loaded ? "none" : "block" }} src={BlueCross} onLoad={() => setLoaded(false)} alt="BlueCross" />
                {
                    (loaded ? <Loader /> : <></>)
                }
                <h2>
                    Log In to
          </h2>
                <h1>
                    Blue Cross Blue Shield
          </h1>
            </a>
        </div>
    );
}

export default Content;
