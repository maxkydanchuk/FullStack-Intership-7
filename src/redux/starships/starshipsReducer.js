import {
  FETCH_STARSHIPS_SUCCESS,
  STARSHIPS_HAS_ERROR,
  STARSHIPS_ARE_LOADING,
  SET_CURRENT_PAGE,
  CREATE_STARSHIP,
  EDIT_STARSHIP,
  DELETE_STARSHIP,
  RESET_STORE
} from './starshipsTypes'

const initialState = {
  data: [],
  loading: false,
  error: "",
  currentPage: null,
  totalCount: 0
};

export const starshipsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STARSHIPS_ARE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STARSHIPS_SUCCESS:
      return {
        ...state,
        data: action.data,
        totalCount: action.totalCount,
        loading: false,
      };
    case STARSHIPS_HAS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.haveError,
      };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.page
        };
        case CREATE_STARSHIP: 
        return {
          ...state,
         data: [...state.data, action.payload]
        };
        case EDIT_STARSHIP: 
        return {
          initialState
        }
        case DELETE_STARSHIP: 
        return {
          initialState
        }
        case RESET_STORE: 
        return {
          initialState
        }
    default:
      return state;
  }
};

