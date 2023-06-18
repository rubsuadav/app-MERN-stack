import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./authTypes";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        accessToken: action.payload.access,
      };
    case LOGIN_FAILURE:
    case LOGOUT:
      return {
        isAuthenticated: false,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
