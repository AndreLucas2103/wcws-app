import { IChat } from 'interfaces/IChat';
import { CHATS_RECUSADO_ADICIONAR, CHATS_RECUSADO_REMOVER } from 'redux/types/chatsRecusadoTypes';

export function chatsRecusadoAdicionar(chat: IChat) {
    return {
        type: CHATS_RECUSADO_ADICIONAR,
        payload: chat,
    };
}

export function chatsRecusadoRemover(_id: string) {
    return {
        type: CHATS_RECUSADO_REMOVER,
        payload: _id,
    };
}
