import {Tabs, Tab} from 'react-bootstrap';
import React, { useState} from 'react';
import Portfolio from './Portfolio.js';
import News from './News.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';



function HorizontalTabs() {
    const [key, setKey] = useState('portfolio');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className= "Tabs" 
      >
        <Tab eventKey="portfolio" title="Portfolio">
          <Portfolio />
        </Tab>
        <Tab eventKey="news" title="News" disabled>
          <News /> 
        </Tab>
      </Tabs>
    );
  }
  
export default HorizontalTabs;