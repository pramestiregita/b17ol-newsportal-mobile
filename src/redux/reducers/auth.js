const initialState = {
  token: '',
  alertMsg: '',
  isLogin: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        isError: false,
        isLoading: false,
        isLogin: true,
        token: action.payload.data.token,
        alertMsg: 'Login Succesfully',
      };
    }
    case 'SIGNUP_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGNUP_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'SIGNUP_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'LOGOUT': {
      return initialState;
    }
    case 'CLEAR': {
      return {
        ...state,
        isError: false,
        isSuccess: false,
        isLoading: false,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
