import React, { useEffect, useState } from 'react';
import { db } from './lib/firebase';
import { SnackbarProvider } from 'notistack';

import { GlobalStyles, Layout, RouterComponent } from './components/index';

function App(props) {
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
                  purchaseEstimates:
                    doc.data()['formData']['purchaseEstimates'],
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
        <div className="App">
          <h1>Shopping app</h1>
          <RouterComponent
            {...props}
            token={token}
            list={list}
            loading={loading}
            error={error}
            userToken={token}
            updateToken={updateToken}
          />
        </div>
      </Layout>
    </SnackbarProvider>
  );
}

export default App;
