import { useAppSelector } from '@/utils/hooks/useRedux';
import { IMensagem } from 'interfaces/IMensagem';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { dateString } from 'components/text/formatoDate';
import { IUsuario } from 'interfaces/IUsuario';
import { useSocketEmit } from '@/utils/hooks/useSocketEmit';
import { IChat } from 'interfaces/IChat';

export const Chat = () => {
    const { uidChat } = useParams();

    const chat = useAppSelector((state) => state.chatsAndamento).find((chat) => chat.uid === uidChat);

    const scrollMensagemNova = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollMensagemNova.current) {
            scrollMensagemNova.current.scrollIntoView();
        }
    }, [chat]);

    if (!chat) return null;

    return (
        <div className="flex h-full">
            <div className="w-8/12 px-20px py-10px">
                <p className="text-10px text-medium">Protocolo: {uidChat}</p>
                <section className="h-full py-10px">
                    <div className="bg-gray-300/70 h-full rounded-[14px] flex flex-col justify-between">
                        <div></div>
                        <div className="h-full overflow-y-auto px-20px my-10px scrollhost">
                            <Mensagens mensagens={chat?.mensagens || []} />

                            <div ref={scrollMensagemNova} />
                        </div>
                        <div className="p-10px">
                            <InputChat chat={chat} />
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-4/12"></div>
        </div>
    );
};

const InputChat = ({ chat }: { chat: IChat }) => {
    useEffect(() => {
        setMensagem('');
    }, [chat._id]);

    const { usuario } = useAppSelector((state) => state.usuario);
    const [mensagem, setMensagem] = useState<string>('');
    const { emit } = useSocketEmit<{ mensagem: string; idChat: string; idUsuario: string }>('nova_mensagem');

    if (!usuario) return null;

    const enviarMensagem = () => {
        if (chat.situacao !== 2) return;

        // enviar mensagem para o socket
        if (mensagem.length > 0) {
            setMensagem('');
            emit({
                idChat: chat._id,
                mensagem,
                idUsuario: usuario._id,
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const commentEnterSubmit = (e: any) => {
        // enviar o text usando o enter
        if (e.key === 'Enter' && e.shiftKey == false) {
            e.preventDefault();
            return enviarMensagem();
        }
    };

    return (
        <div className="h-full text-12px ">
            <div className="bg-white flex w-full p-10px  rounded-[10px]">
                <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    onKeyDown={commentEnterSubmit}
                    disabled={chat.situacao === 2 && chat.socketId !== null ? false : true}
                    className="w-full h-[54px] text-12px leading-normal border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 focus:z-10 disabled:bg-gray-100"
                ></textarea>
                <button
                    className="bg-blue-500 h-[30px] w-[40px] ml-10px flex items-center justify-center rounded-[6px]"
                    onClick={enviarMensagem}
                >
                    <img
                        src="https://img.icons8.com/sf-ultralight-filled/25/FFFFFF/paper-plane.png"
                        className="w-[20px] h-20px"
                        alt=""
                    />
                </button>
            </div>
        </div>
    );
};

const Mensagens = ({ mensagens }: { mensagens: IMensagem[] }) => {
    const formatMensagem = (mensagem: string) => {
        function linkify() {
            const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gi;
            return mensagem.replace(urlRegex, function (url) {
                return (
                    '<a href="' +
                    url +
                    '" target="_blank" className="hover:text-blue-400 underline " >' +
                    url.replace('https://', '') +
                    '</a>'
                );
            });
        }

        return parse(linkify());
    };

    const msgGroup: {
        hora: string | Date;
        usuario: IUsuario | null;
        mensagens: IMensagem[];
    }[] = [];

    mensagens.forEach((msg, i) => {
        if (typeof msg.usuario === 'string') return;

        const hora = dateString(msg.data, { format: 'HH:mm' });

        const mensagemAnterior = mensagens[i - 1];

        if (mensagemAnterior) {
            if (typeof mensagemAnterior.usuario === 'string') return;

            if (
                mensagemAnterior.usuario?._id === msg.usuario?._id &&
                dateString(mensagemAnterior.data, { format: 'HH:mm' }) === hora
            ) {
                msgGroup[msgGroup.length - 1].mensagens.push(msg);
            } else {
                msgGroup.push({
                    hora,
                    mensagens: [msg],
                    usuario: msg.usuario,
                });
            }
        } else {
            msgGroup.push({
                hora,
                mensagens: [msg],
                usuario: msg.usuario,
            });
        }
    });

    return (
        <>
            {msgGroup?.map((group, index) => {
                return group.usuario ? (
                    <section className="flex justify-end mb-[10px] items-end " key={index}>
                        <div className="mr-10px flex flex-col text-12px  max-w-[80%] ">
                            <div className="space-y-[4px] flex flex-col items-end">
                                {group.mensagens.map((msg) => (
                                    <div className="flex flex-col items-end" key={msg._id}>
                                        <span className="px-[10px] py-[8px] rounded-[6px] inline-block bg-white ">
                                            <p className="whitespace-pre-wrap">{formatMensagem(msg.mensagem)}</p>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-10px mt-[2px] mr-[6px] text-gray-400 text-end">
                                {group.hora.toString()}
                            </p>
                        </div>
                        <img src={group.usuario.foto} className="rounded-[6px] w-20px h-20px mb-[20px] " alt="" />
                    </section>
                ) : (
                    <section className="flex space-y-10px items-end mb-[10px]" key={index}>
                        <img
                            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            className="rounded-[6px] w-20px h-20px mb-[20px]"
                            alt=""
                        />
                        <div className="ml-10px flex flex-col text-12px max-w-[80%]">
                            <div className="space-y-[4px]">
                                {group.mensagens.map((msg) => (
                                    <div className="" key={msg._id}>
                                        <span className="px-[10px] py-[8px] rounded-[6px] inline-block bg-white ">
                                            <p className=" whitespace-pre-wrap">{formatMensagem(msg.mensagem)}</p>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-10px mt-[2px] ml-[6px] text-gray-400">{group.hora.toString()}</p>
                        </div>
                    </section>
                );
            })}
        </>
    );
};
