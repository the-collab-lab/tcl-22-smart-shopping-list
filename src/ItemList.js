import React, { useState, useEffect } from 'react';
import Item from './Item';
import { useHistory } from 'react-router-dom';
import filter from './lib/filter';
import { differenceInDays, fromUnixTime } from 'date-fns';
import styled from 'styled-components';
import { Typography, TextField, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteBtnSearch = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 19px;
  margin-left: 15px;
`;

const StyledDiv = styled.div`
  margin-bottom: 30px;
`;

const StyledHeading = styled.div`
  margin-top: 30px;
`;

const StyledNoItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledP = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
`;

function ItemList(props) {
  const emptyObj = {
    week: [],
    month: [],
    longer: [],
    inactive: [],
  };
  const [list, setList] = useState({ emptyObj });
  const [query, setQuery] = useState('');
  const [queryObj, setQueryObj] = useState({ emptyObj });
  let history = useHistory();
  const redirect = () => {
    history.push('/additems');
  };

  // When props.list updates, update the local list object
  useEffect(() => {
    const resultsObj = {
      week: [],
      month: [],
      longer: [],
      inactive: [],
    };

    // Separate list items into categories based on how soon they should be bought
    props.list.forEach((item) => {
      if (!(item.purchaseEstimates?.length > 0)) {
        resultsObj['inactive'].push(item);
      } else {
        // If the item hasn't been bought yet,
        // calculate lastInterval based on the date when it was added to the list
        // and how soon the user wanted to buy it:
        const lastPurchase =
          item.purchaseDates.length > 0
            ? fromUnixTime(
                item.purchaseDates[item.purchaseDates.length - 1].seconds,
              )
            : fromUnixTime(item.dateAdded?.seconds);

        const lastInterval = differenceInDays(Date.now(), lastPurchase);
        const lastEstimate =
          item.purchaseEstimates[item.purchaseEstimates.length - 1];
        const daysRemaining = lastEstimate - lastInterval;
        item.daysRemaining = daysRemaining;

        if (lastInterval >= 2 * lastEstimate || isNaN(lastInterval)) {
          resultsObj['inactive'].push(item);
        } else if (daysRemaining <= 7) {
          resultsObj['week'].push(item);
        } else if (daysRemaining <= 30) {
          resultsObj['month'].push(item);
        } else {
          resultsObj['longer'].push(item);
        }
      }
    });

    // Sort items within each category by next purchase date and then by name
    Object.entries(resultsObj).forEach(([key, value]) => {
      const newArray = value;

      newArray.length > 0 &&
        newArray.sort((a, b) => {
          const alphabetize = (a, b) => {
            const stringA = a['itemName'];
            const stringB = b['itemName'];
            return stringA.localeCompare(stringB);
          };

          if (key === 'inactive') {
            return alphabetize(a, b);
          } else {
            const dateA = a.daysRemaining;
            const dateB = b.daysRemaining;
            if (dateA === dateB) {
              return alphabetize(a, b);
            } else {
              return dateA - dateB;
            }
          }
        });
      resultsObj[key] = newArray;
    });

    setList(resultsObj);

    // With each list update, reset search results:
    setQueryObj(resultsObj);
    setQuery('');
  }, [props.list]);

  const changeHandler = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // When query updates, filter for search results
    if (newQuery === '') {
      setQueryObj(list);
    } else {
      const resultsObj = {};
      Object.entries(list).forEach(([key, value]) => {
        // [filter-list] 2. Comparison function to filter shopping list and create a search results array
        const newArray = filter(value, newQuery, false);
        resultsObj[key] = newArray;
      });
      setQueryObj(resultsObj);
    }
  };

  const clickHandler = () => {
    setQuery('');
    setQueryObj(list);
  };

  return (
    <div
      style={{
        marginBottom: '5em',
      }}
    >
      {props.loading && <span>Collection: Loading...</span>}
      {props.error && !props.loading && <strong>Error: {props.error}</strong>}
      {props.list && props.list.length === 0 && (
        <>
          <StyledNoItems>
            <Typography variant="h1">Your list</Typography>
            <StyledP>
              <Typography variant="p">
                Your shopping list is currently empty. Add your first item.
              </Typography>
            </StyledP>
            <Fab
              onClick={redirect}
              type="submit"
              color="secondary"
              aria-label="add"
            >
              <Add />
            </Fab>
          </StyledNoItems>
        </>
      )}
      {props.list && props.list.length > 0 && (
        <>
          {/* [filter-list] 1. Add text field above shopping list */}

          <StyledDiv>
            <Typography variant="h1">Your list:</Typography>
          </StyledDiv>

          <label htmlFor="filter">
            <TextField
              id="filter"
              variant="outlined"
              type="text"
              label="Search items"
              value={query}
              onChange={changeHandler}
            />
          </label>

          {/* [filter-list] 4. Add 'X' button for user to clear query field */}
          {query.length !== 0 && (
            <DeleteBtnSearch aria-label="clear field" onClick={clickHandler}>
              <FaTrashAlt className="trash-icon" />
            </DeleteBtnSearch>
          )}

          <form>
            {Object.entries(queryObj).map(([key, value]) => {
              return (
                value.length > 0 && (
                  <div key={key}>
                    <StyledHeading>
                      <Typography variant="h2">
                        {key === 'week' && 'Items for next week:'}
                        {key === 'month' && 'Items for next month:'}
                        {key === 'longer' && 'Items for much later:'}
                        {key === 'inactive' && 'No prediction yet:'}
                      </Typography>
                    </StyledHeading>

                    {value.map((item) => (
                      <Typography variant="p">
                        <Item
                          key={item.id}
                          userToken={props.userToken}
                          item={item}
                          status={key}
                        />
                      </Typography>
                    ))}
                  </div>
                )
              );
            })}
          </form>
          <Fab
            onClick={redirect}
            type="submit"
            color="secondary"
            aria-label="add"
          >
            <Add />
          </Fab>
        </>
      )}
    </div>
  );
}
export default ItemList;
