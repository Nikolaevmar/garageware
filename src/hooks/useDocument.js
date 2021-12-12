import {useEffect, useState} from 'react';
import { firestore } from '../firebase/config';

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    //realtime data 
    useEffect(() => {
        const ref = firestore.collection(collection).doc(id)

        const unsub = ref.onSnapshot((snapshot) => {
            setDocument({...snapshot.data(), id: snapshot.id})
            setError(null)
        }, (err) => {
            console.log(err.message);
            setError('Failed to get document')
        })

        return () => unsub()

    }, [collection, id])
    return {document, error}
}