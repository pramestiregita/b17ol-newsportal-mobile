const initialState = {
  data: {},
  detail: {},
  pageInfo: {},
  isLoading: false,
  isError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'GET_NEWS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_NEWS_DETAIL_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEWS_DETAIL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'GET_NEWS_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        detail: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'SEARCH_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SEARCH_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'SEARCH_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'SORT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SORT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'SORT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    default: {
      return state;
    }
  }
};
