import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { AddItems, Welcome, ShareYourToken } from '../../pages/index';
import ItemList from '../../ItemList';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
  },
});

const IconTabs = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  const classes = useStyles();

  const tabNameToIndex = {
    0: props.token ? 'list' : 'welcome',
    1: 'additems',
    2: 'shareyourtoken',
  };

  const indexToTabName = {
    list: 0,
    welcome: 0,
    additems: 1,
    shareyourtoken: 2,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(indexToTabName[page]);
  }, [page]);

  return (
    <>
      {console.log(props)}
      <Paper square className={classes.root}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs example"
        >
          <Tab icon={<PlaylistAddCheckIcon />} aria-label="list" />
          <Tab icon={<AddCircleOutlineIcon />} aria-label="add item" />
          <Tab icon={<PeopleOutlineIcon />} aria-label="share" />
        </Tabs>
      </Paper>
      {selectedTab === 0 && props.token && (
        <ItemList
          list={props.list}
          loading={props.loading}
          error={props.error}
          userToken={props.token}
          history={history}
        />
      )}
      {selectedTab === 0 && !props.token && (
        <Welcome updateToken={props.updateToken} />
      )}
      {selectedTab === 1 && (
        <AddItems list={props.list} userToken={props.token} />
      )}
      {selectedTab === 2 && <ShareYourToken history={history} />}
    </>
  );
};

export default IconTabs;
