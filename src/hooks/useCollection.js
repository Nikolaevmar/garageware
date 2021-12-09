import { useEffect, useState,useRef } from "react";
import { firestore } from "../firebase/config";

export const useCollection = (collection, _query, _order) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //if we don't use a ref we will get an infinite loop in useEffect
 //_query is an array and is 'different' on every function call which triggers the infinite loop
  const query = useRef(_query).current;
  const order = useRef(_order).current;

  useEffect(() => {
    let ref = firestore.collection(collection);

    if(query){
      ref = ref.where(...query)
    }
    if(order){
      ref = ref.orderBy(...order)
    }

    //the snapshot represents the collection at that moment in time & will contain the docs on it
    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        setError('Could not fetch the data');
      }
    );
    //unsub on unmount
    return () => unsub();
  }, [collection, query, order]);
  return { documents, error };
};
