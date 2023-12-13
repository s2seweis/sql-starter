import {firestore} from '../../../src/services/firebase';
import {doc, updateDoc} from 'firebase/firestore';

export const setUserData = userData => ({
  type: 'SET_USER_DATA',
  payload: userData,
});

export const clearUserData = () => ({
  type: 'CLEAR_USER_DATA',
});

export const updateUserData = (docId, updatedData) => {
  return async dispatch => {
    try {
      await updateDoc (doc (firestore, 'users', docId), updatedData);
      dispatch ({type: 'DATA_UPDATED_USER', payload: {docId, updatedData}});
    } catch (error) {
      console.error ('Error updating document: ', error);
    }
  };
};
