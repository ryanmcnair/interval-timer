import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import MyNavBar from '../compontents/MyNav/index';
import Routes from '../helpers/Routes';

class App extends React.Component {
  render() {
    return (
      <>
      <div className="App">
        <Router>
          <MyNavBar />
          <Routes />
        </Router>
      </div>
      </>
    );
  }
}

export default App;
