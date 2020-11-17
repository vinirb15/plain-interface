import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Company from '../../components/Company';
import DoubleImages from '../../components/Dobleimg';

import Header from '../../components/Header';

import Zendesk from '../../assets/Zendesk.png';
import PowerBI from '../../assets/PowerBI.png';
import Displays from '../../assets/Displays.png';

import './styles.css';

export default function Content() {

  const history = useHistory()

  function pageTeste() {
    history.push('/')
  }

  return (
    <div>

      <Header />

      <div className="HomeContent">

        <div className="box-content first">
          <Link to="/">
            <img src={PowerBI} alt="prod4" />
            <h2>
              Log In to
          </h2>
            <h1>
              Power BI
          </h1>
          </Link>
        </div>

        <div className="box-content first">
          <Link to="/">
            <img src={Displays} alt="prod4" />
            <h2>
              Log In to
          </h2>
            <h1>
              Power BI
          </h1>
          </Link>
        </div>

        <div className="box-content first">
          <Link to="/">
            <img src={Zendesk} alt="prod4" />
            <h2>
              Log In to
          </h2>
            <h1>
              Power BI
          </h1>
          </Link>
        </div>
        {/* 2 area */}

        <DoubleImages />

        <div className="utils">
          <h1>Useful links by department</h1>
          <button onClick={pageTeste} className="button">HR</button>
          <button onClick={pageTeste} className="button">Parts & Service</button>
          <button onClick={pageTeste} className="button">Merch</button>
          <button onClick={pageTeste} className="button">Marketing</button>
          <button onClick={pageTeste} className="button">Cord Systems</button>
        </div>

        <Company />

      </div>

    </div>
  );
}