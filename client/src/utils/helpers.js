export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return `${name}s`;
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve) => {
    // open connection to the database `taco-shop` with the version of 1
    const request = window.indexedDB.open('taco-shop', 1);

    // create variables to hold reference to the database, transaction (tx), and object store
    let db;
    let tx;
    let store;

    // if version has changed (or if this is the first time using the database), run this method and create the three object stores
    request.onupgradeneeded = () => {
      db = request.result;
      // create object store for each type of data and set "primary" key index to be the `_id` of the data
      db.createObjectStore('items', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // handle any errors with connecting
    request.onerror = () => {
      console.log('There was an error');
    };

    // on database open success
    request.onsuccess = () => {
      // save a reference of the database to the `db` variable
      db = request.result;
      // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, 'readwrite');
      // save a reference to that object store
      store = tx.objectStore(storeName);

      // if there's any errors, let us know
      db.onerror = (e) => {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get': {
          const all = store.getAll();
          all.onsuccess = () => {
            resolve(all.result);
          };
          break;
        }
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = () => {
        db.close();
      };
    };
  });
}
