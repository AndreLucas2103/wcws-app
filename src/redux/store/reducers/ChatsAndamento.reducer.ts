import { IChat } from 'interfaces/IChat';
import { IMensagem } from 'interfaces/IMensagem';
import {
    CHATS_ANDAMENTO_ADICIONAR,
    CHATS_ANDAMENTO_ATUALIZAR_CHAT,
    CHATS_ANDAMENTO_REMOVER,
    CHATS_ANDAMENTO_ADICIONAR_NOVA_MENSAGEM,
} from '../../types/chatsAndamentoTypes';

const INITIAL_STATE: IChat[] = [];

type ChatsAndamentoReduxType =
    | { type: typeof CHATS_ANDAMENTO_ADICIONAR; payload: IChat }
    | { type: typeof CHATS_ANDAMENTO_REMOVER; payload: string }
    | { type: typeof CHATS_ANDAMENTO_ATUALIZAR_CHAT; payload: { _id: string; data: Partial<IChat> } }
    | { type: typeof CHATS_ANDAMENTO_ADICIONAR_NOVA_MENSAGEM; payload: { idChat: string; mensagem: IMensagem } };

export function ChatsAndamentoReducer(state = INITIAL_STATE, action: ChatsAndamentoReduxType) {
    switch (action.type) {
        case CHATS_ANDAMENTO_ADICIONAR:
            return [...state, action.payload];

        case CHATS_ANDAMENTO_REMOVER:
            return state.filter((chat) => chat._id !== action.payload);

        case CHATS_ANDAMENTO_ATUALIZAR_CHAT:
            return state.map((chat) =>
                chat._id === action.payload._id
                    ? {
                          ...chat,
                          ...action.payload.data,
                      }
                    : chat,
            );

        case 'CHATS_ANDAMENTO_ADICIONAR_NOVA_MENSAGEM':
            return state.map((chat) =>
                chat._id === action.payload.idChat
                    ? {
                          ...chat,
                          mensagens: chat.mensagens
                              ? [...chat.mensagens, action.payload.mensagem]
                              : [action.payload.mensagem],
                      }
                    : chat,
            );

        default:
            return state;
    }
}
