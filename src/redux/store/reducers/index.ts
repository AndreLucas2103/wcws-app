import { combineReducers } from "redux";
import { LoadingReducer } from "./Loading.reducer";
import { UsuarioReducer } from "./Usuario.reducer";

const reducer = combineReducers({
    loading: LoadingReducer,
    usuario: UsuarioReducer
});

export default reducer