import { IUsuario } from "interfaces/IUsuario";
import { SET_USUARIO, SET_USUARIO_STATUS } from "../../types/usuarioTypes";

interface IUsuarioRedux {
    usuario: IUsuario | null
}

const INITIAL_STATE: IUsuarioRedux = {
    usuario: null
};
type UsuarioReduxActionType =
    | { type: typeof SET_USUARIO, payload: IUsuario }
    | { type: typeof SET_USUARIO_STATUS, payload: 1 | 2 | 3 }

export function UsuarioReducer(state = INITIAL_STATE, action: UsuarioReduxActionType) {
    switch (action.type) {
        case SET_USUARIO:
            return { ...state, usuario: action.payload };

        case SET_USUARIO_STATUS:
            if (state.usuario) {
                return { ...state, usuario: { ...state.usuario, statusChat: action.payload } };
            }
            return state;

        default:
            return state;
    }
};