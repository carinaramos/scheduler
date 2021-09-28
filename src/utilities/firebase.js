import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect} from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDqF5CYxcf15Ocrt0QFgOqRQCPW7PZ9IBo",
    authDomain: "scheduler-carina.firebaseapp.com",
    databaseURL: "https://scheduler-carina-default-rtdb.firebaseio.com",
    projectId: "scheduler-carina",
    storageBucket: "scheduler-carina.appspot.com",
    messagingSenderId: "1097743566367",
    appId: "1:1097743566367:web:d46f8d2a5d3ffe2a62b72a"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};