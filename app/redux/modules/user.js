import { Map, fromJS } from "immutable";
import { INIT } from "../../actions/actionConstants";

const initialState = {
  authenticated: false,
  token: "",
  user: {},
  sistema: "",
  loginError: {}
};

const REGISTER_USER = "REGISTER_USER";

export const registerUser = (token, user, sistema) => {
  return {
    type: REGISTER_USER,
    token,
    user,
    sistema,
    authenticated: true
  };
};

export const unregisterUser = () => {
  return {
    type: REGISTER_USER,
    token: "",
    user: {},
    sistema: "",
    authenticated: false
  };
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state;
    case REGISTER_USER:
      return { ...state, ...action };
    default:
      return state;
  }
}
