import React from 'react';

import './styles.css';

import Header from '../../components/Header';
import Power from '../../components/PowerBI';
import Display from '../../components/ERP';
import ZendeskManager from '../../components/Zendesk';
import Knowledge from '../../components/Knowledge';
import CreateTicket from '../../components/CreateTicket';
import CompanyAnnoun from '../../components/CompanyAnnoun';

export default function Content() {

  return (
    <div>

      <Header />

      <div className="HomeContent">

        <Power />

        <Display />

        <ZendeskManager />

        <Knowledge />

        <CreateTicket />

        <CompanyAnnoun />

      </div>

    </div >
  );
}