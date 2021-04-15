import React, { useState } from 'react';
import { db } from './lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

function ItemList() {
  const userToken = localStorage.getItem('userToken');
  const [value, loading, error] = useCollection(db.collection(userToken), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <>
          <h2>Shopping List:</h2>
          <ul>
            {value.docs.map((doc) => (
              <li key={doc.id}>
                {JSON.stringify(doc.data()['formData']['itemName']).replace(
                  /['"]+/g,
                  '',
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
export default ItemList;
