import { useAppDispatch, useAppSelector } from '@/utils/hooks/useRedux';
import { socket } from '@/utils/providers/SocketIoProvider';
import { dateString } from 'components/text/formatoDate';
import { ICallbackSocket } from 'interfaces/ICallbackSocket';
import { IChat } from 'interfaces/IChat';
import { Link } from 'react-router-dom';
import { chatsAguardandoRemover } from 'redux/store/actions/ChatsAguardando.action';
import { chatsAndamentoAdicionar } from 'redux/store/actions/ChatsAndamento.action';
import { chatsRecusadoAdicionar } from 'redux/store/actions/ChatsRecusado.action';

export const FilaAtendimentos = () => {
    const chatsAndamento = useAppSelector((state) => state.chatsAndamento);
    const chatsAguardando = useAppSelector((state) => state.chatsAguardando);

    return (
        <div>
            <section className="mt-20px ">
                <p className="font-semibold">FIla de atendimentos</p>

                <div className="grid gap-y-[6px]">
                    {chatsAndamento.map((chat, index) => (
                        <ChatCardAndamento key={index} chat={chat} />
                    ))}
                </div>
            </section>

            <hr className="border-t-2 border-dashed my-10px" />

            <section className="mt-20px ">
                <div className="grid gap-y-[6px]">
                    {chatsAguardando.map((chat, index) => (
                        <ChatCardAguardando key={index} chat={chat} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const ChatCardAguardando = ({ chat }: { chat: IChat }) => {
    const { usuario } = useAppSelector((state) => state.usuario);

    const dispatch = useAppDispatch();

    function recusarChat() {
        dispatch(
            chatsRecusadoAdicionar({
                ...chat,
                recusado: true,
            }),
        );
        dispatch(chatsAguardandoRemover(chat._id));
    }

    function aceitarChat() {
        socket.emit(
            'usuario_aceitar_chat',
            {
                idChat: chat._id,
                idUsuario: usuario?._id,
            },
            (callback: ICallbackSocket<{ chat: IChat }>) => {
                dispatch(chatsAguardandoRemover(chat._id));
                dispatch(
                    chatsAndamentoAdicionar({
                        _id: callback.data.chat._id,
                        usuarioFila: null,
                        situacao: callback.data.chat.situacao,
                        uid: callback.data.chat.uid,
                        novaMensagem: 0,
                        dataInicio: callback.data.chat.dataInicio,
                        usuarioResponsavel: callback.data.chat.usuarioResponsavel,
                        dataFim: null,
                        email: callback.data.chat.email,
                        nome: callback.data.chat.nome,
                        socketId: callback.data.chat.socketId,
                    }),
                );
            },
        );
    }

    return (
        <div key={chat.uid} className="border-2 rounded-[14px] min-h-[80px] bg-gray-100">
            <div className="flex justify-between">
                <div>
                    <span className="text-medium text-12px ml-10px">
                        {dateString(chat.dataInicio, { format: 'HH:mm' })}
                    </span>
                </div>
                <div className="text-10px text-medium px-[10px] py-[1px] bg-gray-200 rounded-bl-[14px] rounded-tr-[14px]">
                    Aguardando
                </div>
            </div>
            <div className="flex justify-between py-[10px] px-[10px] ">
                <span>{chat?.nome}</span>
            </div>

            <div className="px-[8px] mb-10px flex justify-center">
                <button
                    className="border py-[4px] px-10px flex items-center rounded-[14px] hover:border-blue-500"
                    type="button"
                    onClick={aceitarChat}
                >
                    <img
                        src="https://img.icons8.com/external-becris-lineal-becris/64/1A1A1A/external-check-mintab-for-ios-becris-lineal-becris-1.png"
                        className="w-[14px]"
                        alt=""
                    />
                    <span className="ml-10px">Aceitar</span>
                </button>
                <button
                    className="border py-[4px] px-10px flex items-center rounded-[14px] hover:border-red-500 ml-10px"
                    type="button"
                    onClick={recusarChat}
                >
                    <img
                        src="https://img.icons8.com/ios-glyphs/30/1A1A1A/delete-sign.png"
                        className="w-[14px]"
                        alt=""
                    />
                    <span className="ml-[4px] text-10px text-medium">{chat.segundosFila}</span>
                </button>
            </div>
        </div>
    );
};

const ChatCardAndamento = ({ chat }: { chat: IChat }) => {
    return (
        <Link to={`/atendimento/chats/${chat.uid}`} className="border-2 rounded-[14px] min-h-[40px] bg-gray-100">
            <div className="flex justify-between">
                <div>
                    <span className="text-medium text-12px ml-10px">
                        {dateString(chat.dataInicio, { format: 'HH:mm' })}
                    </span>
                </div>
                <div className="text-10px px-[10px] py-[1px] bg-gray-200 rounded-bl-[14px] rounded-tr-[14px]">
                    {chat.situacao === 2 && <p className="text-green-600">Andamento</p>}
                    {chat.situacao === 3 && <p className="text-red-600">Finalizado</p>}
                </div>
            </div>
            <div className="flex justify-between py-[10px] px-[10px] ">
                <span>{chat?.nome}</span>
            </div>
        </Link>
    );
};
