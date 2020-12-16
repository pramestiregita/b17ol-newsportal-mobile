const initialState = {
  data: {},
  detail: {},
  pageInfo: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'GET_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_MY_POST_DETAIL_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_MY_POST_DETAIL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'GET_MY_POST_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        detail: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'SEARCH_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SEARCH_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'SEARCH_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'SORT_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SORT_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'SORT_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'NEXT_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'NEXT_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'NEXT_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'DELETE_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'DELETE_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'DELETE_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'CREATE_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CREATE_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'CREATE_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
        data: action.payload.data.data,
      };
    }
    case 'EDIT_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'EDIT_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'EDIT_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    case 'EDIT_PICT_MY_POST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'EDIT_PICT_MY_POST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'EDIT_PICT_MY_POST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    case 'LOGOUT': {
      return {
        data: {},
        detail: {},
        pageInfo: {},
        isLoading: false,
        isError: false,
        isSuccess: false,
        alertMsg: '',
      };
    }
    case 'CLEAR_MYPOST': {
      return {
        ...state,
        alertMsg: '',
        isError: false,
        isSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
