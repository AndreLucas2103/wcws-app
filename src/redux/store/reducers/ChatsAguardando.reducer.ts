import { IChat } from 'interfaces/IChat';
import {
    CHATS_AGUARDANDO_ADICIONAR,
    CHATS_AGUARDANDO_REMOVER,
    CHATS_AGUARDANDO_REMOVER_TODOS,
    CHATS_AGUARDANDO_SET_SEGUNDOS_FILA,
    CHATS_AGUARDANDO_ATUALIZAR_CHAT,
} from 'redux/types/chatAguardandoTypes';

const INITIAL_STATE: IChat[] = [];

type LoadingType =
    | { type: typeof CHATS_AGUARDANDO_ADICIONAR; payload: IChat }
    | { type: typeof CHATS_AGUARDANDO_REMOVER; payload: string }
    | { type: typeof CHATS_AGUARDANDO_SET_SEGUNDOS_FILA; payload: IChat[] }
    | { type: typeof CHATS_AGUARDANDO_REMOVER_TODOS; payload: void }
    | { type: typeof CHATS_AGUARDANDO_ATUALIZAR_CHAT; payload: { _id: string; data: Partial<IChat> } };

export const ChatsAguardandoReducer = (state = INITIAL_STATE, action: LoadingType) => {
    switch (action.type) {
        case CHATS_AGUARDANDO_ADICIONAR:
            return [...state, action.payload];

        case CHATS_AGUARDANDO_REMOVER:
            return state.filter((chat) => chat._id !== action.payload);

        case CHATS_AGUARDANDO_SET_SEGUNDOS_FILA:
            return action.payload;

        case CHATS_AGUARDANDO_REMOVER_TODOS:
            return [];

        case CHATS_AGUARDANDO_ATUALIZAR_CHAT:
            return state.map((chat) =>
                chat._id === action.payload._id
                    ? {
                          ...chat,
                          ...action.payload.data,
                      }
                    : chat,
            );

        default:
            return state;
    }
};
