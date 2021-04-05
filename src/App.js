import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import AddItem from './components/AddItem';
import List from './components/List';

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <h1>Shopping app</h1>
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/additem">
            <AddItem />
          </Route>
        </Switch>
        <nav style={{ position: 'absolute', bottom: '0' }}>
          <ul>
            <li>
              <NavLink
                to="/list"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/additem"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                Add Item
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
