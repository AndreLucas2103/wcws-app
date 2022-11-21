import { IUsuario } from "interfaces/IUsuario";
import { SET_USUARIO, SET_USUARIO_STATUS } from "../../types/usuarioTypes";

export function setUsuario(data: IUsuario) {
    return {
        type: SET_USUARIO,
        payload: data,
    };
}

export function setUsuarioStatus(status: 1 | 2 | 3) {
    return {
        type: SET_USUARIO_STATUS,
        payload: status,
    };
}