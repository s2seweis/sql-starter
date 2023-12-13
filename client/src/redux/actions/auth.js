import { loginUser, logoutUser, registerUser, getUserData } from '../../services/firebase';
import { setUserData, clearUserData } from './user';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const login = (email, password) => async (dispatch) => {
  
  try {
    const userCredential = await loginUser(email, password);

    const userData = await getUserData(userCredential.uid);

    dispatch(setUserData(userData));
    dispatch(loginSuccess(userData));

    setTimeout (() => {
      window.location.href = '/';
    }, 500);
  } catch (error) {
    // Dispatch action if login fails
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(clearUserData());
    dispatch({ type: LOGOUT_REQUEST });
    await logoutUser();
    
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }
};

export const register = (email, name, password) => async (dispatch) => {
 
  try {
    dispatch({ type: REGISTER_REQUEST });
    const user = await registerUser(email, name, password);
    const userData = await getUserData(user.uid);
    dispatch(setUserData(userData));

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};
