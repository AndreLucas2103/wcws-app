import { IChat } from 'interfaces/IChat';
import { CHATS_AGUARDANDO_ADICIONAR, CHATS_AGUARDANDO_REMOVER } from 'redux/types/chatAguardandoTypes';

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
