import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { db } from './lib/firebase';
import { SnackbarProvider } from 'notistack';

import AddItems from './AddItems';
import ItemList from './ItemList';
import Welcome from './Welcome';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = db.collection(token).onSnapshot((snapshot) => {
        const newList = [];
        snapshot.forEach((doc) => {
          // This seems to work, while snapshot.map doesn't
          newList.push(
            JSON.stringify(doc.data()['formData']['itemName']).replace(
              /['"]+/g,
              '',
            ),
          );
        });
        setList(newList);
        setError(null);
        setLoading(false);
      });
    } catch (error) {
      setError("Can't connect to the database");
      setLoading(false);
    }
    return () => {
      unsubscribe();
    };
  }, [token]);

  return (
    <Router>
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <h1>Shopping app</h1>
          <Switch>
            <Route path="/list">
              <ItemList list={list} loading={loading} error={error} />
            </Route>
            <Route path="/additems">
              <AddItems list={list} userToken={token} />
            </Route>
            <Route exact path="/">
              {token ? (
                <Redirect to="/list" />
              ) : (
                <Welcome setToken={setToken} />
              )}
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
      </SnackbarProvider>
    </Router>
  );
}

export default App;
