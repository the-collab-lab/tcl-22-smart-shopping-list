import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Welcome } from '../../pages';
import Nav from './Nav';

const RouterComponent = (props) => {
  const { token, list, loading, error, updateToken } = props;
  return (
    <Router>
      <Switch>
        {props.token && (
          <Route
            exact
            path={['/list', '/additems', '/shareyourtoken']}
            render={(props) => (
              <Nav
                {...props}
                token={token}
                list={list}
                loading={loading}
                error={error}
                userToken={token}
                updateToken={updateToken}
              />
            )}
          />
        )}
        <Route exact path="/">
          {props.token ? (
            <Redirect to="/list" />
          ) : (
            <Welcome updateToken={props.updateToken} />
          )}
        </Route>
        <Route render={() => <Redirect to="/list" />} />
      </Switch>
    </Router>
  );
};

export default RouterComponent;
