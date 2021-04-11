import React, { useState } from 'react';
import { db } from './lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

function ItemList() {
  const [value, loading, error] = useCollection(
    db.collection('randomTokenOne'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{' '}
            {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data()['formData']['itemName'])},{' '}
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </div>
  );
}
export default ItemList;
