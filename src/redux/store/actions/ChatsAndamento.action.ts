import { IChat } from 'interfaces/IChat';
import {
    CHATS_ANDAMENTO_ADICIONAR,
    CHATS_ANDAMENTO_ATUALIZAR_CHAT,
    CHATS_ANDAMENTO_REMOVER,
} from 'redux/types/chatsAndamentoTypes';

export function chatsAndamentoAdicionar(chat: IChat) {
    return {
        type: CHATS_ANDAMENTO_ADICIONAR,
        payload: chat,
    };
}

export function chatsAndamentoRemover(_id: string) {
    return {
        type: CHATS_ANDAMENTO_REMOVER,
        payload: _id,
    };
}

export function chatsAndamentoAtualizarChat(_id: string, data: Partial<IChat>) {
    return {
        type: CHATS_ANDAMENTO_ATUALIZAR_CHAT,
        payload: {
            _id,
            data,
        },
    };
}
