import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import AddGroceries from './AddGroceries';
import GroceryList from './GroceryList';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Shopping app</h1>
        <Switch>
          <Route path="/list">
            <GroceryList />
          </Route>
          <Route path="/additems">
            <AddGroceries />
          </Route>
        </Switch>
        <nav
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
          }}
        >
          <ul
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              paddingLeft: '0',
            }}
          >
            <li>
              <NavLink
                to="/list"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                Grocery List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/additems"
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                Add Groceries
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
