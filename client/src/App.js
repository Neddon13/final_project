import './App.css';
import {useState} from 'react';
import React from 'react';
import Website from './containers/Website';

function App() {

  window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
  }, false);

  return <Website />
}

export default App;
