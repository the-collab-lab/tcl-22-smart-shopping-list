import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { AddItems, Welcome, ShareYourToken } from '../../pages/index';
import { theme, primary } from '../../components/index';
import ItemList from '../../ItemList';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  max-width: 1170px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 10px 10px 0 0;
`;

const paperStyles = makeStyles({
  root: {
    minWidth: '100%',
    borderRadius: '12px 12px 0 0',
    background: theme.palette.primary.main,
  },
});

const tabsStyles = makeStyles({
  root: {
    width: '100%',
    color: '#F2F3F2',
  },
});

const iconStyles = makeStyles({
  root: {
    color: 'rgba(242, 243, 242, .5)',
  },
});

const tabStyles = makeStyles({
  root: {
    borderRadius: '5px',
    margin: '10px 15px',
    '&:hover': {
      backgroundColor: '#A6CF93',
      cursor: 'pointer',
      '& svg': {
        color: 'white',
      },
    },
  },
});

const IconTabs = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  const paperClasses = paperStyles();
  const tabsClasses = tabsStyles();
  const iconClasses = iconStyles();
  const tabClasses = tabStyles();

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
      <StyledDiv>
        <Paper square className={paperClasses.root}>
          <Tabs
            className={tabsClasses.root}
            value={selectedTab}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
            centered={true}
          >
            <Tab
              className={tabClasses.root}
              icon={<PlaylistAddCheckIcon className={iconClasses.root} />}
              aria-label="list"
            />
            <Tab
              className={tabClasses.root}
              icon={<AddCircleOutlineIcon className={iconClasses.root} />}
              aria-label="add item"
            />
            <Tab
              className={tabClasses.root}
              icon={<PeopleOutlineIcon className={iconClasses.root} />}
              aria-label="share"
            />
          </Tabs>
        </Paper>
      </StyledDiv>
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
