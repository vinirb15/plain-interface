import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import Zendesk from '../../assets/Zendesk.png';
import PowerBI from '../../assets/PowerBI.png';
import Displays from '../../assets/Displays.png';
import KnowledgeBase from '../../assets/Knowledge.png';

import './styles.css';

export default function Content() {

  return (
    <div>

      <Header />

      <div className="HomeContent">

        <div className="box-content images">
          <Link to="/">
            <img src={PowerBI} alt="PowerBI" />
            <h2>
              Log In to FEG
          </h2>
            <h1>
              Power BI
          </h1>
          </Link>
        </div>

        <div className="box-content images">
          <Link to="/">
            <img src={Displays} alt="ERP" />
            <h2>
              Log In to FEG
          </h2>
            <h1>
              ERP
          </h1>
          </Link>
        </div>

        <div className="box-content images">
          <Link to="/">
            <img src={Zendesk} alt="Zendesk" />
            <h2>
              Log In to FEG
          </h2>
            <h1>
              Zendesk Management
          </h1>
          </Link>
        </div>

        <div className="box-content images">
          <Link to="/">
            <img src={KnowledgeBase} alt="Knowledge Base" />
            <h2>
              Log In to FEG
          </h2>
            <h1>
              Knowledge Base
          </h1>
          </Link>
        </div>

        <div className="box-content images">
          <Link to="/">
            <img src={KnowledgeBase} alt="Create Ticket" />
            <h2>
              To FEG
          </h2>
            <h1>
              Create Your Ticket
          </h1>
          </Link>
        </div>

        <div className="company">
          <Link to="/">
            <h1>Company Announcements</h1>
          </Link>
        </div>

      </div>

    </div>
  );
}