import React, { useState, useEffect } from 'react';
import Item from './Item';
import { useHistory } from 'react-router-dom';
import filter from './lib/filter';
import { differenceInDays, fromUnixTime } from 'date-fns';

function ItemList(props) {
  const [query, setQuery] = useState('');
  const [queryObj, setQueryObj] = useState({
    week: [],
    month: [],
    longer: [],
    inactive: [],
  });
  let history = useHistory();
  const redirect = () => {
    history.push('/additems');
  };

  useEffect(() => {
    const resultsObj = {
      week: [],
      month: [],
      longer: [],
      inactive: [],
    };

    // Separate list items into categories based on how soon they should be bought
    props.list.forEach((item) => {
      if (
        item.purchaseDates.length < 1 ||
        !(item.purchaseEstimates?.length > 0)
      ) {
        resultsObj['inactive'].push(item);
      } else {
        const lastPurchase = fromUnixTime(
          item.purchaseDates[item.purchaseDates.length - 1].seconds,
        );
        const lastInterval = differenceInDays(Date.now(), lastPurchase);
        const lastEstimate =
          item.purchaseEstimates[item.purchaseEstimates.length - 1];
        const daysRemaining = lastEstimate - lastInterval;
        item.daysRemaining = daysRemaining;

        if (lastInterval >= 2 * lastEstimate) {
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

    // Sort items by next purchase date and then by name, filter for search results
    Object.entries(resultsObj).forEach(([key, value]) => {
      // [filter-list] 2. Comparison function to filter shopping list and create a search results array
      const newArray = filter(value, query, false);

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

    setQueryObj(resultsObj);
  }, [query, props.list]);

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const clickHandler = () => {
    setQuery('');
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
          <p>Your shopping list is currently empty.</p>
          <button onClick={redirect}>Add Item</button>
        </>
      )}
      {props.list && props.list.length > 0 && (
        <>
          {/* [filter-list] 1. Add text field above shopping list */}
          <label htmlFor="filter">
            Filter Items
            <input
              id="filter"
              type="text"
              placeholder="Start typing here..."
              value={query}
              onChange={changeHandler}
            />
          </label>
          {/* [filter-list] 4. Add 'X' button for user to clear query field */}
          {query.length !== 0 && (
            <button aria-label="clear field" onClick={clickHandler}>
              X
            </button>
          )}
          <h2>Shopping List:</h2>

          <form>
            {Object.entries(queryObj).map(([key, value]) => {
              return (
                value.length > 0 && (
                  <>
                    <h3>
                      {key === 'week' && 'Items to buy in the next week:'}
                      {key === 'month' && 'Items to buy in the next month:'}
                      {key === 'longer' &&
                        'Items to buy in the distant future:'}
                      {key === 'inactive' && "Purchases we can't predict yet:"}
                    </h3>
                    <ul>
                      {value.map((item) => (
                        <Item
                          key={item.id}
                          userToken={props.userToken}
                          item={item}
                        />
                      ))}
                    </ul>
                  </>
                )
              );
            })}
          </form>
        </>
      )}
    </div>
  );
}
export default ItemList;
