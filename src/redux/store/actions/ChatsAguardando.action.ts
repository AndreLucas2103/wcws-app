import { IChat } from 'interfaces/IChat';
import {
    CHATS_AGUARDANDO_ADICIONAR,
    CHATS_AGUARDANDO_REMOVER,
    CHATS_AGUARDANDO_SET_SEGUNDOS_FILA,
    CHATS_AGUARDANDO_ATUALIZAR_CHAT,
} from 'redux/types/chatAguardandoTypes';

export function chatsAguardandoAdicionar(chat: IChat) {
    return {
        type: CHATS_AGUARDANDO_ADICIONAR,
        payload: chat,
    };
}

export function chatsAguardandoRemover(_id: string) {
    return {
        type: CHATS_AGUARDANDO_REMOVER,
        payload: _id,
    };
}

export function chatsAguardandoAtualizarChat(_id: string, data: Partial<IChat>) {
    return {
        type: CHATS_AGUARDANDO_ATUALIZAR_CHAT,
        payload: {
            _id,
            data,
        },
    };
}

export function chatsAguardandoSetSegundosFila(chats: IChat[]) {
    return {
        type: CHATS_AGUARDANDO_SET_SEGUNDOS_FILA,
        payload: chats,
    };
}
