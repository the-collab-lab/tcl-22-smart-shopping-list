function filter(array, string, exactMatch) {
  // [filter-list] (Remove accidental space character from query, make lowercase, and prevent regex errors)
  const checkItem = (item) => {
    const itemLetters = item
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .trim()
      .toLowerCase()
      .split('');
    const itemLettersFilt = itemLetters.filter((l) => {
      // Remove punctuation from all strings to comply with requirements for AddItem.js
      return /[a-z|\s]/.test(l);
    });
    return itemLettersFilt.join('');
  };

  const resultsArray = array.filter((itemObj) => {
    if (exactMatch) {
      // To prevent adding duplicate items
      return checkItem(itemObj['itemName']) === checkItem(string);
    } else {
      // To search for an item in the list
      return checkItem(itemObj['itemName']).includes(checkItem(string));
    }
  });
  return resultsArray;
}

export default filter;
