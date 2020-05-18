import React, {Component, Fragment} from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Cars from '../screens/Driver/Cars/Cars.js';
import CurrentTrip from '../screens/Driver/CurrentTrip/CurrentTrip.js';
import Account from '../screens/Driver/Account/Account.js';
import AddTrip from '../screens/Driver/AddTrip/AddTrip.js';
import TripTimeline from '../screens/Driver/TripTimeline/TripTimeline.js';

class App extends Component{
  render() {
      return(
          <BrowserRouter>
              <div>
                  <NavigationBar/>
                  <Route path="/" exact component={CurrentTrip} />
                  <Route path="/cars" exact component={Cars} />
                  <Route path="/currenttrip" exact component={CurrentTrip} />
                  <Route path="/account" exact component={Account} />
                  <Route path="/addtrip" exact component={AddTrip} />
                  <Route path="/triptimeline" exact component={TripTimeline} />
              </div>
          </BrowserRouter>
          )
  }
}

export default App;
