import { combineReducers } from 'redux';
import { ChatsAguardandoReducer } from './ChatsAguardando.reducer';
import { ChatsAndamentoReducer } from './ChatsAndamento.reducer';
import { ChatsRecusadoReducer } from './ChatsRecusado.reducer';
import { LoadingReducer } from './Loading.reducer';
import { UsuarioReducer } from './Usuario.reducer';

const reducer = combineReducers({
    loading: LoadingReducer,
    usuario: UsuarioReducer,
    chatsAguardando: ChatsAguardandoReducer,
    chatsAndamento: ChatsAndamentoReducer,
    chatsRecusado: ChatsRecusadoReducer,
});

export default reducer;
