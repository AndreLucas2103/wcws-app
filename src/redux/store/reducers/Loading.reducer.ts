import { SET_LOADING } from "redux/types/loadingTypes";

type LoadingType =
    | { type: typeof SET_LOADING, payload: boolean }

export const LoadingReducer = (state = false, action: LoadingType) => {
    switch (action.type) {

        case SET_LOADING:
            return action.payload;

        default:
            return state;
    }
}