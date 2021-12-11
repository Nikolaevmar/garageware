import { useState, useEffect } from "react";
import { fireauth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const response = await fireauth.createUserWithEmailAndPassword(email,password);
      if (!response) {
        throw new Error("Could not sign up");
      }
      //add display name for user
      await response.user.updateProfile({ displayName });

      //dispatch login action
      dispatch({ type: "LOG_IN", payload: response.user });

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

useEffect(() => {
  return () => setIsCancelled(true);
}, []);

  return { error, isPending, signup };
};