import * as Actions from '../actions';

const initialState = {
    entities: [],
    searchText: '',
    selectedContactIds: [],
    routeParams: {},
    selectedIndex: 0,
    pagination: {
        limit: 5,
        offset: 0,
        total: 0,
    }
};

const quotesReducer = function (state = initialState, action) {
    //console.log("action", action);
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
                    entities: action.payload.data,
                    routeParams: action.routeParams,
                    pagination: {
                        limit: action.payload.limit,
                        offset: action.payload.offset,
                        total: action.payload.total,
                    }
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
