import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Calendar from '../../../assets/Calendar.png';
import Loader from '../../Loader';

import './styles.css';

const Content = () => {

  const [loaded, setLoaded] = useState(true);

  return (
    <div className="box-calendar">
      <Link to="/calendar">
        <h1>
          <b>feg </b>
            calendar
        </h1>
        <img style={{ display: loaded ? "none" : "block" }} src={Calendar} onLoad={() => setLoaded(false)} alt="PowerBI" />
        {
          (loaded ? <Loader /> : <></>)
        }
        <button>see more</button>
      </Link>
    </div>
  );
}

export default Content;
