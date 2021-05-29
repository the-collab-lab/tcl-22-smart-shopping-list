import React, { useEffect, useState } from 'react';
import { db } from './lib/firebase';
import {
  GlobalStyles,
  Layout,
  RouterComponent,
  theme,
} from './components/index';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

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
                if (doc.id !== 'ListData') {
                  const obj = {
                    id: doc.id,
                    itemName: doc.data()['formData']['itemName'],
                    purchaseDates: doc.data()['formData']['purchaseDates'],
                    purchaseEstimates:
                      doc.data()['formData']['purchaseEstimates'],
                    dateAdded: doc.data()['formData']['dateAdded'],
                  };
                  newList.push(obj);
                }
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
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
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
    </ThemeProvider>
  );
}

export default App;
