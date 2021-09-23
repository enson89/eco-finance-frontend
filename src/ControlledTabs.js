import {Tabs, Tab} from 'react-bootstrap';
import React, { useState} from 'react';
import Portfolio from './Portfolio.js';
import Transactions from './Transactions.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';



function HorizontalTabs() {
    const [key, setKey] = useState('portfolio');
    const [data,setData] = useState('User')
    
    async function retrievename () {
      return await fetch('https://eco-finance-backend.herokuapp.com/api/login', {
        method: 'POST',
        headers: {"Content-Type" :'application/json'},
        body: localStorage.getItem('user')
      })
      .then((response) => response.json())
    }
    
    async function greeting () {
      let username = await retrievename();
      console.log(username.name)
      setData(username.name)
    }
    greeting()

    return (
    <div>
      <br/>
        Hi, {data}
      <br/>
      <br/>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className= "Tabs" 
      >
        <Tab eventKey="portfolio" title="Portfolio">
          <Portfolio />
        </Tab>
        <Tab eventKey="news" title="Transactions">
          <Transactions /> 
        </Tab>
      </Tabs>
    </div>
    );
  }
  
export default HorizontalTabs;
