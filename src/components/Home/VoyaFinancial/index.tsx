import React, { useState } from 'react';
import Voya from '../../../assets/Voya.png';
import '../PowerBI/styles.css';
import Loader from '../../Loader';
import AnaliticsEvents from '../Analytics'

const Content = () => {
    const [loaded, setLoaded] = useState(true);

    return (
        <div className="box-content images">
            <a onClick={() => AnaliticsEvents('Voya Financial')} target="_blank" rel="noopener noreferrer" href=" https://my.voya.com/voyassoui/index.html#/login">
                <img style={{ display: loaded ? "none" : "block" }} src={Voya} onLoad={() => setLoaded(false)} alt="Voya" />
                {
                    (loaded ? <Loader /> : <></>)
                }
                <h2>
                    Log In to
          </h2>
                <h1>
                    Voya Financial
          </h1>
            </a>
        </div>
    );
}

export default Content;
