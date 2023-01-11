import { useAppDispatch, useAppSelector } from '@/utils/hooks/useRedux';
import { useSocketEmit } from '@/utils/hooks/useSocketEmit';
import { dateString } from 'components/text/formatoDate';
import { IChat } from 'interfaces/IChat';
import { Link } from 'react-router-dom';
import { chatsAguardandoRemover } from 'redux/store/actions/ChatsAguardando.action';
import { chatsAndamentoAdicionar } from 'redux/store/actions/ChatsAndamento.action';
import { chatsRecusadoAdicionar } from 'redux/store/actions/ChatsRecusado.action';

export const FilaAtendimentos = () => {
    const chatsAndamento = useAppSelector((state) => state.chatsAndamento);
    const chatsAguardando = useAppSelector((state) => state.chatsAguardando);

    return (
        <div className="h-full overflow-y-auto scrollhost">
            <section className="">
                <p className="font-semibold">FIla de atendimentos</p>

                <div className="grid gap-y-[6px]">
                    {chatsAndamento.map((chat, index) => (
                        <ChatCardAndamento key={index} chat={chat} />
                    ))}
                </div>
            </section>

            <hr className="border-t-2 border-dashed my-10px" />

            <section className="">
                {chatsAguardando.length > 0 && (
                    <>
                        <p className="font-semibold">Em espera</p>

                        <div className="grid gap-y-[6px]">
                            {chatsAguardando.map((chat, index) => (
                                <ChatCardAguardando key={index} chat={chat} />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

const ChatCardAguardando = ({ chat }: { chat: IChat }) => {
    const { usuario } = useAppSelector((state) => state.usuario);

    const dispatch = useAppDispatch();

    function recusarChat() {
        if (chat.situacao === 3) {
            dispatch(chatsAguardandoRemover(chat._id));
        } else {
            dispatch(
                chatsRecusadoAdicionar({
                    ...chat,
                    recusado: true,
                }),
            );
            dispatch(chatsAguardandoRemover(chat._id));
        }
    }

    const { emit } = useSocketEmit<{ idChat: string; idUsuario: string }, { chat: IChat }>('usuario_aceitar_chat', {
        onSucess: (data) => {
            dispatch(chatsAguardandoRemover(chat._id));
            dispatch(
                chatsAndamentoAdicionar({
                    _id: data.chat._id,
                    usuarioFila: null,
                    situacao: data.chat.situacao,
                    uid: data.chat.uid,
                    novaMensagem: 0,
                    dataInicio: data.chat.dataInicio,
                    usuarioResponsavel: data.chat.usuarioResponsavel,
                    dataFim: null,
                    email: data.chat.email,
                    nome: data.chat.nome,
                    socketId: data.chat.socketId,
                }),
            );
        },
    });

    return (
        <div key={chat.uid} className="border-2 rounded-[10px] min-h-[40px] bg-gray-50">
            <div className="flex justify-between">
                <div>
                    <span className="text-medium text-12px ml-10px">
                        {dateString(chat.dataInicio, { format: 'HH:mm' })}
                    </span>
                </div>
                <div className="text-10px text-medium px-[10px] py-[1px] bg-gray-200 rounded-bl-[10px] rounded-tr-[10px]">
                    {chat.socketId === null && chat.situacao !== 3 ? (
                        'Reconectando'
                    ) : (
                        <>
                            {chat.situacao === 1 && <p className="">Aguardando</p>}
                            {chat.situacao === 3 && <p className="text-red-600">Finalizado</p>}
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between py-[10px] px-[10px] ">
                <span>{chat?.nome}</span>
            </div>

            <div className="px-[8px] mb-10px flex justify-center">
                {chat.situacao !== 3 && (
                    <button
                        className="border py-[4px] px-10px flex items-center rounded-[14px] hover:border-blue-500 disabled:bg-gray-100"
                        type="button"
                        disabled={chat.socketId === null ? true : false}
                        onClick={() => {
                            emit({
                                idChat: chat._id,
                                idUsuario: usuario?._id || '',
                            });
                        }}
                    >
                        {chat.socketId === null ? (
                            <p>Aguarde ...</p>
                        ) : (
                            <>
                                <img
                                    src="https://img.icons8.com/external-becris-lineal-becris/64/1A1A1A/external-check-mintab-for-ios-becris-lineal-becris-1.png"
                                    className="w-[14px]"
                                    alt=""
                                />
                                <span className="ml-10px">Aceitar</span>
                            </>
                        )}
                    </button>
                )}
                <button
                    className="border py-[4px] px-10px flex items-center rounded-[14px] hover:border-red-500 ml-10px disabled:bg-gray-100"
                    disabled={chat.socketId === null && chat.situacao !== 3 ? true : false}
                    type="button"
                    onClick={recusarChat}
                >
                    <img
                        src="https://img.icons8.com/ios-glyphs/30/1A1A1A/delete-sign.png"
                        className="w-[14px]"
                        alt=""
                    />
                    <span className="ml-[4px] text-10px text-medium">
                        {chat.situacao === 3 ? 'Fechar' : chat.segundosFila}
                    </span>
                </button>
            </div>
        </div>
    );
};

const ChatCardAndamento = ({ chat }: { chat: IChat }) => {
    return (
        <Link to={`/atendimento/chats/${chat.uid}`} className="border rounded-[10px] min-h-[40px] bg-gray-50">
            <div className="flex justify-between">
                <div>
                    <span className="text-medium text-10px ml-10px">
                        {dateString(chat.dataInicio, { format: 'HH:mm' })}
                    </span>
                </div>
                <div className="text-10px px-[10px] py-[1px] bg-gray-200 rounded-bl-[10px] rounded-tr-[10px]">
                    {chat.socketId === null && chat.situacao !== 3 ? (
                        'Reconectando'
                    ) : (
                        <>
                            {chat.situacao === 2 && <p className="text-green-600">Andamento</p>}
                            {chat.situacao === 3 && <p className="text-red-600">Finalizado</p>}
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between py-[4px] px-[10px] ">
                <span>{chat?.nome}</span>
            </div>
        </Link>
    );
};
