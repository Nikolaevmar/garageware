import { useState, useEffect } from "react";
import { fireauth, firestore, fireStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, userImage) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const response = await fireauth.createUserWithEmailAndPassword(email,password);

      if (!response) {
        throw new Error("Could not sign up");
      }

      //upload user image
      const uploadPath = `thumbnails/${response.user.uid}/${userImage.name}`
      const img = await fireStorage.ref(uploadPath).put(userImage)
      const imgUrl = await img.ref.getDownloadURL();

      //add display name for user
      await response.user.updateProfile({ displayName, photoURL: imgUrl });
      //create user doc
      await firestore.collection('users').doc(response.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl
      })

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
