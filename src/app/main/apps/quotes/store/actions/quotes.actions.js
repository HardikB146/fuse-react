import axios from 'axios';

export const GET_QUOTES = '[QUOTES APP] GET QUOTES';
export const UPDATE_QUOTES = '[QUOTES APP] UPDATE QUOTES';
export const DELETE_QUOTES = '[QUOTES APP] DELETE QUOTES';
export const ADD_QUOTES = '[QUOTES APP] ADD QUOTES';
export const SET_SELECTED_ITEM_ID = '[QUOTES APP] SET SELECTED ITEM';

const BASEURL = `https://us-central1-nbdab-5c937.cloudfunctions.net/v1`;

export function getQuotes(routeParams) {
    const request = axios.get(`${BASEURL}/api/quotes`, {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) => {
            console.log("getQuotes response", response);
            dispatch({
                type: GET_QUOTES,
                payload: response.data ? response.data : [],
                routeParams
            });
        }).catch((error) => {
            console.log('getQuotes error', error);
            if (error.response.status === 401) {
                reloadAuth();
            } else if (error.response.status === 500) {
                reloadAuth();
            }
        });
}

export function updateQuotes(formData) {
    const request = axios.put(`${BASEURL}/api/quotes/${formData.id}`, formData);
    return (dispatch) =>
        request.then((response) => {
            console.log("updateQuotes response", response);
            dispatch({
                type: UPDATE_QUOTES,
                payload: { QuotesId: formData.id, data: formData },
            });
        }).catch((error) => {
            console.log('updateQuotes error', error);
        });
}

export function deleteQuotes(Id) {
    const request = axios.delete(`${BASEURL}/api/quotes/${Id}`);
    return (dispatch) =>
        request.then((response) => {
            console.log("deleteQuotes response", response);
            dispatch({
                type: DELETE_QUOTES,
                payload: { QuotesId: Id },
            });
        }).catch((error) => {
            console.log('deleteQuotes error', error);
        });
}


export function addQuotes(formData) {
    const request = axios.post(`${BASEURL}/api/quotes`, formData);

    return (dispatch) =>
        request.then((response) => {
            console.log("addQuotes response", response);
            dispatch({
                type: ADD_QUOTES,
                payload: { data: response.data },
            });
        }).catch((error) => {
            console.log('addQuotes error', error);
        });
}

export function reloadAuth() {
    let data = JSON.stringify({
        "email": "hardikb@gmail.com",
        "password": "password123"
    })

    axios.post(`${BASEURL}/auth/login`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cG9zdG1hbjpwYXNzd29yZA==',
        }
    }).then((response) => {
        console.log('reloadAuth response', response);
        localStorage.setItem("FushReactAuthToken", response.data.access_token);
        getQuotes();
    }).catch((error) => {
        console.log('reloadAuth error', error);
    })
}

export function setSelectedIndex(index) {
    return {
        type: SET_SELECTED_ITEM_ID,
        payload: index
    }
}