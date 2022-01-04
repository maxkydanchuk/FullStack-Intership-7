import apiService from "../../services/api-service";
import {pageSize} from '../../configs/config'
import {
    FETCH_STARSHIPS_SUCCESS,
    STARSHIPS_HAS_ERROR,
    STARSHIPS_ARE_LOADING,
    FILTER_STARSHIPS,
    SET_CURRENT_PAGE,
    CREATE_STARSHIP,
    EDIT_STARSHIP,
    DELETE_STARSHIP,
    RESET_STORE
} from './starshipsTypes'

const api = new apiService();

export const fetchDataSuccess = (data, totalCount) => ({
    type: FETCH_STARSHIPS_SUCCESS,
    data,
    totalCount
});

export const dataHaveError = (bool) => ({
    type: STARSHIPS_HAS_ERROR,
    haveError: bool,
});

export const dataAreLoading = (bool) => ({
    type: STARSHIPS_ARE_LOADING,
    isLoading: bool,
});

export const filterData = (payload) => ({
    type: FILTER_STARSHIPS,
    payload,
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    page
});

export const addStarship = (payload) => ({
    type: CREATE_STARSHIP,
    payload
});

export const editStarship = (payload) => ({
    type: EDIT_STARSHIP,
    payload
});

export const deleteStarship = (id) => ({
    type: DELETE_STARSHIP,
    id
});

export const resetStore = () => ({
    type: RESET_STORE,
});


export function fetchStarshipsData(param) {
    return (dispatch) => {
        const {sortOrder, sortColumn, inputValue, currentPage} = param;
        dispatch(dataAreLoading(true));
        api.getAllStarships(sortOrder, `fields.${sortColumn}`, inputValue, currentPage, pageSize)
            .then((response) => dispatch(fetchDataSuccess(response.data, response.totalCount)))
            .catch(() => dispatch(dataHaveError(true)));
    };
}

export function addStarshipThunk(item) {
    return  (dispatch) => {
        dispatch(dataAreLoading(true));
        api.createStarship(item)
        .then((response) => dispatch(addStarship(response)))
        .catch(() => dispatch(dataHaveError(true)))
    }
}

export function deleteStarshipThunk(id, token) {
    return (dispatch) => {
        dispatch(dataAreLoading(true)); 
        api.deleteResource('starships', id, token)
        .then((response) => dispatch(deleteStarship(response)))
        .catch(() => dispatch(dataHaveError(true)))
    }
}

export function updateStarshipThunk(item, id, token) {
    return (dispatch) => {
        dispatch(dataAreLoading(true));
        api.updateResource('starships', id, item, token)
        .then((response) => dispatch(editStarship(response)))
        .catch(() => dispatch(dataHaveError(true)))
    }
}