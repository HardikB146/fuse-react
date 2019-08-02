import * as Actions from '../actions';

const initialState = {
    entities: [],
    searchText: '',
    selectedContactIds: [],
    routeParams: {},
    selectedIndex: 0,
    contactDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const quotesReducer = function (state = initialState, action) {
    console.log("action", action);
    switch (action.type) {
        case Actions.SET_SELECTED_ITEM_ID:
            {
                return {
                    ...state,
                    selectedIndex: action.payload,
                };
            }
        case Actions.GET_QUOTES:
            {
                return {
                    ...state,
                    entities: action.payload,
                    routeParams: action.routeParams
                };
            }
        case Actions.ADD_QUOTES:
            return {
                ...state,
                entities: [...state.entities, action.payload.data],
            }
        case Actions.UPDATE_QUOTES:
            return {
                ...state,
                entities: state.entities.map((item, index) => {
                    if (item._id !== action.payload.QuotesId) {
                        return item
                    }
                    return {
                        ...item,
                        ...action.payload.data
                    }
                })
            }
        default:
            {
                return state;
            }
    }
};

export default quotesReducer;
