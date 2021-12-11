import { useState, useEffect } from "react";
import { fireauth, firestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
  
      //update status using the uid from our authcontext
      const {uid} = user;
      await firestore.collection('users').doc(uid).update({online: false})

      await fireauth.signOut();
      dispatch({ type: "LOG_OUT" });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //Clean up function that prevents state updating when a component is unmounted.
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
