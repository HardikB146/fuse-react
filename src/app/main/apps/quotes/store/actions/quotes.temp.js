import axios from 'axios';
import * as data from './dummay.json';

export const GET_QUOTES = '[QUOTES APP] GET QUOTES';
export const UPDATE_QUOTES = '[QUOTES APP] UPDATE QUOTES';
export const ADD_QUOTES = '[QUOTES APP] ADD QUOTES';
export const SET_SELECTED_ITEM_ID = '[QUOTES APP] SET SELECTED ITEM';

const BASEURL = `https://us-central1-nbdab-5c937.cloudfunctions.net/v1`;

export function getQuotes(routeParams) {
    return {
        type: GET_QUOTES,
        payload: data.default,
        routeParams
    }
}

export function updateQuotes(formData) {
    console.log("updateQuotes...", formData);
    return {
        type: UPDATE_QUOTES,
        payload: { QuotesId: formData.id, data: formData },
    }
}

export function addQuotes(formData) {
    console.log("addQuotes...", formData);
    return {
        type: ADD_QUOTES,
        payload: { data: formData },
    }
}

export function reloadAuth() {
    console.log('login clicked')
    let data = JSON.stringify({
        "email": "hardikb@com.com",
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