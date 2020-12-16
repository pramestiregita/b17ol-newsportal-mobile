const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };
    }
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'CHANGE_PASSWORD_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CHANGE_PASSWORD_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'CHANGE_PASSWORD_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'ADD_AVATAR_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'ADD_AVATAR_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'ADD_AVATAR_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'CHANGE_AVATAR_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CHANGE_AVATAR_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'CHANGE_AVATAR_FULFILLED': {
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
    case 'CLEAR_PROFILE': {
      return {
        ...state,
        alertMsg: '',
        isSuccess: false,
        isError: false,
      };
    }
    default: {
      return state;
    }
  }
};
