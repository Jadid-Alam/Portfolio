import './App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Blog from './Blog';
import Experience from './Experience';
import Projects from './Projects';
import ContactMe from './ContactMe';

function App() {

  return (
    <Router>
      <div className='App'> 
          
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/mini-blog'>
              <Blog />
            </Route>
            <Route path='/experience'>
              <Experience />
            </Route>
            <Route path='/projects'>
              <Projects />
            </Route>
            <Route path='/contact-me'>
              <ContactMe />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
