import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { db } from './lib/firebase';
import { SnackbarProvider } from 'notistack';

import {
  GlobalStyles,
  primary,
  accent,
  neutral,
  Layout,
} from './components/index';
import { AddItems, Welcome } from './pages/index';
import ItemList from './ItemList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = () => {
      try {
        token
          ? db.collection(token).onSnapshot((snapshot) => {
              const newList = [];
              // Restructure data from array to an array of objects,
              // with each object containing name, id and date of the last purchase
              snapshot.forEach((doc) => {
                const obj = {
                  id: doc.id,
                  itemName: doc.data()['formData']['itemName'],
                  purchaseDates: doc.data()['formData']['purchaseDates'],
                  purchaseEstimates: doc.data()['formData'][
                    'purchaseEstimates'
                  ],
                };
                newList.push(obj);
              });
              setList(newList);
              setError(null);
              setLoading(false);
            })
          : setLoading(false);
      } catch (error) {
        setError("Can't connect to the database");
        setLoading(false);
      }
    };
    return unsubscribe();
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('userToken', newToken);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <Layout>
        <GlobalStyles />
        <Router>
          <div className="App">
            <h1>Shopping app</h1>
            <Switch>
              <Route path="/list">
                <ItemList
                  list={list}
                  loading={loading}
                  error={error}
                  userToken={token}
                />
              </Route>
              <Route path="/additems">
                <AddItems list={list} userToken={token} />
              </Route>
              <Route exact path="/">
                {token ? (
                  <Redirect to="/list" />
                ) : (
                  <Welcome updateToken={updateToken} />
                )}
              </Route>
            </Switch>
            {token && (
              <nav
                style={{
                  position: 'fixed',
                  bottom: '0',
                  width: '100%',
                  backgroundColor: '#fff',
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
            )}
          </div>
        </Router>
      </Layout>
    </SnackbarProvider>
  );
}

export default App;
