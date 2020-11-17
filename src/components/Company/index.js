import React from 'react';
import Iframe from 'react-iframe';

import './styles.css'

export default function CompanyAnnouncements(){
    return(
        <div className="iframe-content">
          <h1>Company Announcements</h1>
          <Iframe className="socialPage" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FGoogleBrasil%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="auto" height="auto">
          </Iframe>
        </div>
    )
}