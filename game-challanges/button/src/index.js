import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const completeChallenge = () => console.log("Done!!")

ReactDOM.render(<App
  onClick={ completeChallenge }
/>, document.getElementById('root'));
