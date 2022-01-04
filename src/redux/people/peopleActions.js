import apiService from "../../services/api-service";
import {pageSize} from '../../configs/config'
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
import {addStarship, deleteStarship, editStarship} from "../starships/starshipsActions";


const api = new apiService();

export const fetchDataSuccess = (data, totalCount) => ({
    type: FETCH_PEOPLE_SUCCESS,
    data,
    totalCount
});

export const dataHaveError = (bool) => ({
    type: PEOPLE_HAS_ERROR,
    haveError: bool,
});

export const dataAreLoading = (bool) => ({
    type: PEOPLE_ARE_LOADING,
    isLoading: bool,
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    page
});

export const addPerson = (payload) => ({
    type: CREATE_PERSON,
    payload
});

export const editPerson = (payload) => ({
    type: EDIT_PERSON,
    payload
});

export const deletePerson = (id) => ({
    type: DELETE_PERSON,
    id
});

export const resetStore = () => ({
    type: RESET_STORE,
})

export function fetchPeopleData(param) {
    return (dispatch) => {
        const {sortOrder, sortColumn, inputValue, currentPage} = param;
        dispatch(dataAreLoading(true));
        api.getAllPeople(sortOrder, `fields.${sortColumn}`, inputValue, currentPage, pageSize)
            .then((response) => dispatch(fetchDataSuccess(response.data, response.totalCount)))
            .catch(() => dispatch(dataHaveError(true)));
    };
}

export function addPersonThunk(item) {
    return  (dispatch) => {
        dispatch(dataAreLoading(true));
        api.createPerson(item)
            .then((response) => dispatch(addPerson(response)))
            .catch(() => dispatch(dataHaveError(true)))
    }
}

export function deletePersonThunk(id, token) {
    return (dispatch) => {
        dispatch(dataAreLoading(true));
        api.deleteResource('people', id, token)
            .then((response) => dispatch(deletePerson(response)))
            .catch(() => dispatch(dataHaveError(true)))
    }
}

export function updatePeopleThunk(item, id, token) {
    return (dispatch) => {
        dispatch(dataAreLoading(true));
        api.updateResource('people', id, item, token)
            .then((response) => dispatch(editPerson(response)))
            .catch(() => dispatch(dataHaveError(true)))
    }
}
