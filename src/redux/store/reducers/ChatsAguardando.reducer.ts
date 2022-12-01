import { IChat } from 'interfaces/IChat';
import {
    CHATS_AGUARDANDO_ADICIONAR,
    CHATS_AGUARDANDO_REMOVER,
    CHATS_AGUARDANDO_REMOVER_TODOS,
} from 'redux/types/chatAguardandoTypes';

const INITIAL_STATE: IChat[] = [];

type LoadingType =
    | { type: typeof CHATS_AGUARDANDO_ADICIONAR; payload: IChat }
    | { type: typeof CHATS_AGUARDANDO_REMOVER; payload: string }
    | { type: typeof CHATS_AGUARDANDO_REMOVER_TODOS; payload: void };

export const ChatsAguardandoReducer = (state = INITIAL_STATE, action: LoadingType) => {
    switch (action.type) {
        case CHATS_AGUARDANDO_ADICIONAR:
            return [...state, action.payload];

        case CHATS_AGUARDANDO_REMOVER:
            return state.filter((chat) => chat._id !== action.payload);

        case CHATS_AGUARDANDO_REMOVER_TODOS:
            return [];

        default:
            return state;
    }
};
