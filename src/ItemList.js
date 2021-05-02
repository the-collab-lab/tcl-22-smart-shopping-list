import React, { useState, useEffect } from 'react';
import Item from './Item';
import { useHistory } from 'react-router-dom';

// [filter-list] 3. Map through search results array and render in ItemsList

function ItemList(props) {
  const [query, setQuery] = useState('');
  const [queryArray, setQueryArray] = useState([]);
  let history = useHistory();
  const redirect = () => {
    history.push('/additems');
  };

  useEffect(() => {
    // [filter-list] Remove accidental space character from query and make lowercase
    const transformQuery = query.toLowerCase().trim();

    const filterRegex = new RegExp(transformQuery);

    // [filter-list] 2. Comparison function to filter shopping list and create a search results array
    const resultsArray = props.list.filter((itemObj) => {
      return filterRegex.test(itemObj['itemName'].toLowerCase());
    });
    return setQueryArray([...resultsArray]);
  }, [query, props.list]);

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      {/* {console.log(queryArray)}
      {console.log(`queryArray`, queryArray)} */}
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
          <h2>Shopping List:</h2>
          {console.log(props.list)}
          <form>
            <ul>
              {queryArray.map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  itemName={item.itemName}
                  purchaseDates={item.purchaseDates}
                  userToken={props.userToken}
                />
              ))}
            </ul>
          </form>
        </>
      )}
    </div>
  );
}
export default ItemList;
