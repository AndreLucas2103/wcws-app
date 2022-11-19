import { ICliente } from "interfaces/ICliente";
import { IUsuario } from "interfaces/IUsuario";
import { PropsWithChildren, useEffect } from "react";
import { chatsAguardandoAdicionar, chatsAguardandoCronSegundosFila, chatsAguardandoRemover } from "redux/store/actions/ChatsAguardando.action";
import { chatsAndamentoAtualizarChat } from "redux/store/actions/ChatsAndamento.action";
import { chatsRecusadoAdicionar } from "redux/store/actions/ChatsRecusado.action";
import { setUsuario } from "redux/store/actions/Usuario.action";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { socket } from "../services/socketio";

export const SocketIoProvider = ({ children }: { children: PropsWithChildren }) => {
    return (
        <>
            <CronChatsAguardando />
            <SocketChatsAguardando />
            <EmitChatsRecusados />
            <NovaMensagem />
            <SocketDisconnected />
            <UsuarioConectado />
            {children}
        </>
    )
}

// effect para atualizar o tempo de fila de todso os planos
const CronChatsAguardando = () => {
    const chatsAguardando = useAppSelector((state) => state.chatsAguardando);
    const dispatch = useAppDispatch();

    useEffect(() => { // cronometro para atualizar o tempo de espera dos chats em fila
        if (chatsAguardando.length > 0) {
            const timer = setInterval(() => {
                dispatch(
                    chatsAguardandoCronSegundosFila(
                        chatsAguardando
                            .filter((chat) => {
                                if (chat.segundosFila !== null && chat.segundosFila !== undefined) {
                                    if (chat.segundosFila < 1) { // função para enviar o chat como recusado
                                        dispatch(chatsRecusadoAdicionar(chat));
                                    }

                                    return chat.segundosFila > 0;
                                }
                            })
                            .map((chat) => {
                                return {
                                    ...chat,
                                    segundosFila: chat.segundosFila ? chat.segundosFila - 1 : 60
                                }
                            })
                    )
                )
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [chatsAguardando])

    return null
}

// ouvinte para pegar os chats que vem para o socket, ele coloca eles em fila
const SocketChatsAguardando = () => {
    const dispatch = useAppDispatch();

    useEffect(() => { // chats em fila, observo quando um cliente entra na fila para ser aceito
        socket.on('novo_chat', (data: any) => {
            dispatch(chatsAguardandoAdicionar({
                cliente: {
                    email: data.data.cliente.nome,
                    foto: data.data.cliente.foto,
                    nome: data.data.cliente.nome,
                    id: data.data.cliente.id,
                    socketId: data.data.cliente.socketId,
                },
                idCliente: data.data.cliente.id,
                id: data.data.chat.id,
                segundosFila: 60, // tempo que chat fica em fila para depois ir aos recusados
                idUsuarioFila: data.data.chat.idUsuarioFila,
                situacao: data.data.chat.situacao,
                uuid: data.data.chat.uuid,
                novaMensagem: 0,
                dataInicio: data.data.chat.dataInicio,
                idUsuarioResponsavel: data.data.chat.idUsuarioResponsado || null,
                dataFim: null,
            }))
        })

        return () => {
            socket.off('novo_chat');
        }
    }, [])

    return null
}

// verifica quais são os chats recusados e envia eles de volta para o servidor tratar
const EmitChatsRecusados = () => {
    const chatsRecusados = useAppSelector((state) => state.chatsRecusados);

    useEffect(() => { // chats recusados, trato eles de enviar para o servidor novamente

    }, [chatsRecusados])

    return null
}

// ouvite para pegar todas as mensagens enviadas a room dos sockets
const NovaMensagem = () => {
    useEffect(() => {
        socket.on('nova_mensagem', (data: any) => {
            console.log(data)
        })

        return () => {
            socket.off('nova_mensagem')
        }
    }, [])

    return null
}

// ouvinte para verificar todos os usuários que são desconectados do chat
const SocketDisconnected = () => {
    const chatsAguardando = useAppSelector((state) => state.chatsAguardando);
    const chatsAndamento = useAppSelector((state) => state.chatsAndamento);

    const dispatch = useAppDispatch();

    useEffect(() => { // verifica sempre que um socket é desconectado do servidor
        socket.on('disconnect_socket', (data: {
            data: {
                usuario: IUsuario | null,
                cliente: ICliente | null
            }
        }) => {

            const { data: { cliente, usuario } } = data;

            if (cliente) {
                const chatAguardandoExiste = chatsAguardando.find(c => c.cliente?.socketId === cliente.socketId)
                const chatsAndamentoExiste = chatsAndamento.find(c => c.cliente?.socketId === cliente.socketId)

                if (chatAguardandoExiste) {
                    dispatch(chatsAguardandoRemover(chatAguardandoExiste.id))
                }

                if (chatsAndamentoExiste) {
                    dispatch(chatsAndamentoAtualizarChat(
                        chatsAndamentoExiste.id,
                        {
                            situacao: 3
                        }
                    ))
                }
            }
        })

        return () => {
            socket.off('disconnect_socket')
        }
    }, [chatsAguardando])

    return null
}

// ouvinte para pegar os dados do usuario quando ele conectar, utilizado quando a internet cai e volta
const UsuarioConectado = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('usuario_conectado', (data: { data: { usuario: IUsuario } }) => {
            const { usuario } = data.data;

            dispatch(setUsuario({
                administrador: usuario.administrador,
                email: usuario.email,
                id: usuario.id,
                nomeCompleto: usuario.nomeCompleto,
                primeiroNome: usuario.primeiroNome,
                foto: usuario.foto,
                situacao: usuario.situacao,
                socketId: usuario.socketId,
                statusChat: usuario.statusChat,
            }))
        })

        return () => {
            socket.off('usuario_conectado')
        }
    }, [])

    return null
}