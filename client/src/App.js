import React from 'react';
import Header from './components/Header';
import  {Provider } from 'react-redux'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import store from './redux/store'


function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/dashboard' component={Dashboard} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
