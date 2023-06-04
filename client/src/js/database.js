import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('PUT implemented to database');
  const contactDB = await openDB('jate', 1);
  const text = contactDB.transaction('jate', 'readwrite');
  const storeText = text.objectStore('jate');
  const request = storeText.put({ id: 1, value: content});
  const result = await request;
  console.log('data successfully saved to database', result)
};
// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('GET from database');
  const contactDB = await openDB('jate', 1);
  const text = contactDB.transaction('jate', 'readonly');
  const storeText = text.objectStore('jate');
  const request = storeText.getAll();
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();
