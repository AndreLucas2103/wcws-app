import { IChat } from 'interfaces/IChat';
import {
    CHATS_ANDAMENTO_ADICIONAR,
    CHATS_ANDAMENTO_ATUALIZAR_CHAT,
    CHATS_ANDAMENTO_REMOVER,
} from '../../types/chatsAndamentoTypes';

const INITIAL_STATE: IChat[] = [];

type ChatsAndamentoReduxType =
    | { type: typeof CHATS_ANDAMENTO_ADICIONAR; payload: IChat }
    | { type: typeof CHATS_ANDAMENTO_REMOVER; payload: string }
    | { type: typeof CHATS_ANDAMENTO_ATUALIZAR_CHAT; payload: { idChat: string; data: Partial<IChat> } };

export function ChatsAndamentoReducer(state = INITIAL_STATE, action: ChatsAndamentoReduxType) {
    switch (action.type) {
        case CHATS_ANDAMENTO_ADICIONAR:
            return [...state, action.payload];

        case CHATS_ANDAMENTO_REMOVER:
            return state.filter((chat) => chat._id !== action.payload);

        case CHATS_ANDAMENTO_ATUALIZAR_CHAT:
            return state.map((chat) =>
                chat._id === action.payload.idChat
                    ? {
                          ...chat,
                          ...action.payload.data,
                      }
                    : chat,
            );

        default:
            return state;
    }
}
