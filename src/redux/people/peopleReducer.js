import {
  FETCH_PEOPLE_SUCCESS,
  PEOPLE_HAS_ERROR,
  PEOPLE_ARE_LOADING,
  SET_CURRENT_PAGE,
  CREATE_PERSON,
  EDIT_PERSON,
  DELETE_PERSON,
  RESET_STORE
} from './peopleTypes'

const initialState = {
  data: [],
  loading: false,
  error: "",
  currentPage: null,
  totalCount: 0
};

export const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_ARE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        data: action.data,
        totalCount: action.totalCount,
        loading: false,
      };
    case PEOPLE_HAS_ERROR:
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
    case CREATE_PERSON:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case EDIT_PERSON:
      return {
        initialState
      }
    case DELETE_PERSON:
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

