import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/auth';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case REGISTER_REQUEST:
  case LOGIN_REQUEST:
  case LOGOUT_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case REGISTER_SUCCESS:
  case LOGIN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isAuthenticated: true,
      user: action.payload,
      error: null,
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isAuthenticated: false,
      user: null,
      error: null,
    };
  case REGISTER_FAILURE:
  case LOGIN_FAILURE:
  case LOGOUT_FAILURE:
    return {
      ...state,
      isLoading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default authReducer;
