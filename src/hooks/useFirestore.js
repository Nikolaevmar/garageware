import { useReducer, useEffect, useState } from "react";

import { firestore, timestamp } from "../firebase/config";
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return{
        isPending:false,
        document:null,
        success:true,
        error: null
      }
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = firestore.collection(collection);

  // dispatching if not cancelled == false;
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };


  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date()) //takes the current date at the time of trying to add this doc and stores it in the variable
      const addedDoc = await ref.add({...doc, createdAt});
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDoc });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.meesage });
    }
  };

  //delete doc boilerplate
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING'})

    try{
      await ref.doc(id).delete();
      dispatchIfNotCancelled({type: "DELETED_DOCUMENT"});
    }catch(err){
      dispatchIfNotCancelled({type:"ERROR", payload: "Could not delete"});
    }
  };

  //clean up if the component unmount whilist doing a request
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { addDocument, deleteDocument, state };
};
