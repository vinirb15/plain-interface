import React, { useState } from 'react';
import Guardian from '../../../assets/Guardian.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
    const [loaded, setLoaded] = useState(true);

    return (
        <div className="box-content images">
            <a onClick={() => AnaliticsEvents('Guardian Life')} target="_blank" rel="noopener noreferrer" href="https://www.guardianlife.com">
                <img style={{ display: loaded ? "none" : "block" }} src={Guardian} onLoad={() => setLoaded(false)} alt="Guardian" />
                {
                    (loaded ? <Loader /> : <></>)
                }
                <h2>
                    Log In to
          </h2>
                <h1>
                    Guardian Life Insurance
          </h1>
            </a>
        </div>
    );
}

export default Content;
