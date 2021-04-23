import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import AddItems from './AddItems';
import ItemList from './ItemList';
import Welcome from './Welcome';

function App() {
  const hasToken = localStorage.getItem('userToken');
  return (
    <SnackbarProvider maxSnack={2}>
      <Router>
        <div className="App">
          <h1>Shopping app</h1>
          <Switch>
            <Route path="/list">
              <ItemList />
            </Route>
            <Route path="/additems">
              <AddItems />
            </Route>
            <Route exact path="/">
              {hasToken ? <Redirect to="/list" /> : <Welcome />}
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
    </SnackbarProvider>
  );
}

export default App;
