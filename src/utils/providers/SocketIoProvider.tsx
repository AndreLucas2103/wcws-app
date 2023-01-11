import { ISocketResponse } from 'interfaces/ISocketResponse';
import { IChat } from 'interfaces/IChat';
import { ReactNode, useEffect } from 'react';
import {
    chatsAguardandoAdicionar,
    chatsAguardandoAtualizarChat,
    chatsAguardandoSetSegundosFila,
} from 'redux/store/actions/ChatsAguardando.action';
import { chatsRecusadoAdicionar, chatsRecusadoRemover } from 'redux/store/actions/ChatsRecusado.action';
import socketIOClient from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { useSocketEmit } from '../hooks/useSocketEmit';
import {
    chatsAndamentoAdicionarNovaMensagem,
    chatsAndamentoAtualizarChat,
} from 'redux/store/actions/ChatsAndamento.action';
import { IMensagem } from 'interfaces/IMensagem';

export const socket = socketIOClient('http://localhost:3030', {
    autoConnect: false,
    transports: ['websocket'],
    auth: {
        token: null,
    },
});

export const SocketIoProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        socket.on('connect', () => {});

        socket.on('disconnect', (reason) => {
            console.log(reason);
        });

        socket.on('exception', (data) => console.log(data));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('exception');
        };
    }, []);

    return (
        <>
            <NovoChatAguardando />
            <CronChatsAguardando />
            <NovaMensagem />
            <ChatDisconnect />
            <ChatsRecusados />
            {children}
        </>
    );
};

// ouvinte para pegar os novos chats, que estão aguardando
const NovoChatAguardando = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('novo_chat', (data: ISocketResponse<{ chat: IChat }>) => {
            dispatch(
                chatsAguardandoAdicionar({
                    ...data.data.chat,
                    segundosFila: 60,
                }),
            );
        });

        return () => {
            socket.off('novo_chat');
        };
    }, []);

    return null;
};

const CronChatsAguardando = () => {
    const chatsAguardando = useAppSelector((state) => state.chatsAguardando);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // cronometro para atualizar o tempo de espera dos chats em fila
        if (chatsAguardando.length > 0) {
            const timer = setInterval(() => {
                dispatch(
                    chatsAguardandoSetSegundosFila(
                        chatsAguardando
                            .filter((chat) => {
                                if (chat.segundosFila !== null && chat.segundosFila !== undefined) {
                                    if (chat.segundosFila < 1) {
                                        //  enviar o chat como recusado
                                        dispatch(chatsRecusadoAdicionar(chat));
                                    }

                                    return chat.segundosFila > 0;
                                }
                            })
                            .map((chat) => {
                                if (chat.socketId === null || chat.situacao === 3) return chat;

                                return {
                                    ...chat,
                                    segundosFila: chat.segundosFila ? chat.segundosFila - 1 : 60,
                                };
                            }),
                    ),
                );
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [chatsAguardando]);

    return null;
};

// ouvite para pegar todas as mensagens enviadas a room dos sockets
const NovaMensagem = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('nova_mensagem', (data: ISocketResponse<{ chat: IChat; mensagem: IMensagem }>) => {
            const {
                data: { mensagem, chat },
            } = data;

            dispatch(chatsAndamentoAdicionarNovaMensagem(chat._id, mensagem));
        });

        return () => {
            socket.off('nova_mensagem');
        };
    }, []);

    return null;
};

const ChatDisconnect = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('chat_status', (data: ISocketResponse<{ chat: IChat }>) => {
            const {
                data: { chat },
            } = data;

            dispatch(
                chatsAguardandoAtualizarChat(chat._id, {
                    situacao: chat.situacao,
                    socketId: chat.socketId,
                }),
            );
            dispatch(
                chatsAndamentoAtualizarChat(chat._id, {
                    situacao: chat.situacao,
                    socketId: chat.socketId,
                }),
            );
        });

        return () => {
            socket.off('chat_status');
        };
    }, []);

    return null;
};

const ChatsRecusados = () => {
    const dispatch = useAppDispatch();

    const chatsRecusados = useAppSelector((state) => state.chatsRecusado);

    const { emit } = useSocketEmit<{ idChat: string }>('recusar_chat');

    useEffect(() => {
        if (chatsRecusados.length <= 0) return;

        chatsRecusados.forEach((c) => {
            emit({ idChat: c._id });
            dispatch(chatsRecusadoRemover(c._id));
        });

        // chats recusados, trato eles de enviar para o servidor novamente
    }, [chatsRecusados]);

    return null;
};
