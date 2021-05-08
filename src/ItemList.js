import React, { useState, useEffect } from 'react';
import Item from './Item';
import { useHistory } from 'react-router-dom';

function ItemList(props) {
  const [query, setQuery] = useState('');
  const [queryArray, setQueryArray] = useState([]);
  let history = useHistory();
  const redirect = () => {
    history.push('/additems');
  };

  useEffect(() => {
    // [filter-list] 2. Comparison function to filter shopping list and create a search results array
    // [filter-list] (Remove accidental space character from query, make lowercase, and prevent regex errors)
    const resultsArray = props.list.filter((itemObj) => {
      return itemObj['itemName']
        .toLowerCase()
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .includes(query.toLowerCase().trim());
    });
    return setQueryArray([...resultsArray]);
  }, [query, props.list]);

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const clickHandler = () => {
    setQuery('');
  };

  return (
    <div>
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
            <ul>
              {props.list.map((item) => (
                <Item key={item.id} userToken={props.userToken} item={item} />
              ))}
            </ul>
          </form>
        </>
      )}
    </div>
  );
}
export default ItemList;
