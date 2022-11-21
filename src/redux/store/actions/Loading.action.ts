import { SET_LOADING } from "redux/types/loadingTypes"

export const setLoading = (data: boolean) => {
    return {
        type: SET_LOADING,
        payload: data
    }
}