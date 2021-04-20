import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { db } from './lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SnackbarProvider } from 'notistack';

import AddItems from './AddItems';
import ItemList from './ItemList';
import Welcome from './Welcome';

function App() {
  const hasToken = localStorage.getItem('userToken');
  const [value, loading, error] = useCollection(db.collection(hasToken), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const list = value
    ? value.docs.map((doc) =>
        JSON.stringify(doc.data()['formData']['itemName']).replace(
          /['"]+/g,
          '',
        ),
      )
    : [];

  return (
    <Router>
      <SnackbarProvider maxSnack={3} hideIconVariant>
        <div className="App">
          <h1>Shopping app</h1>
          <Switch>
            <Route path="/list">
              {!loading && (
                <ItemList list={list} loading={loading} error={error} />
              )}
            </Route>
            <Route path="/additems">
              {value && (
                <AddItems list={list} loading={loading} error={error} />
              )}
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
      </SnackbarProvider>
    </Router>
  );
}

export default App;
