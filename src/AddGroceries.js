import React from 'react';
import { db } from './lib/firebase';

function AddGroceries(props) {
  return (
    <div>
      {/* <form id="test-form" onSubmit={submitItem}> */}
      <form id="test-form">
        {/* <input type="text" value={groceryItem} /> */}
        <input type="text" />
        <input type="submit" />
      </form>
    </div>
  );
}

// function submitItem() {
//     db.collection("items").add({
//         input: groceryItem
//     })
//     .then((docRef => {
//     console.log("Document written with ID: ", docRef.id);
//     })
//     .catch((error) => {
//     console.error("Error adding document: ", error);
// })
// }

export default AddGroceries;
