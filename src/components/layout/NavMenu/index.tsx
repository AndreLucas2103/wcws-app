import { socket } from '@/utils/providers/SocketIoProvider';
import { Menu, Transition } from '@headlessui/react';
import { toastError } from 'components/avisos/toast';
import { authToken } from 'config/authToken';
import { ICallbackSocket } from 'interfaces/ICallbackSocket';
import { Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { setUsuarioStatus } from 'redux/store/actions/Usuario.action';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/useRedux';
import { IMenu, menus } from './menus';

export const NavMenu = () => {
    const { usuario } = useAppSelector((state) => state.usuario);

    return (
        <nav className="h-full bg-blue-600 rounded-[20px] py-20px flex justify-center w-full">
            <div className="flex flex-col h-full justify-between">
                <div className="flex justify-center mb-10px">
                    <div>
                        <img
                            src="https://img.icons8.com/ios/50/FFFFFF/react-native--v1.png"
                            className="w-[30px]"
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center overflow-y-auto  overflow-x-hidden scrollbar-navMenu">
                    <div className="h-full flex flex-col ">
                        {menus.map((menu, index) =>
                            menu.titulo === 'Atendimento' ? (
                                <MenuChats key={index} menu={menu} />
                            ) : (
                                <Link
                                    key={index}
                                    to={menu.url}
                                    className="static min-h-[36px] bg-blue-500 flex items-center min-w-[36px] justify-center rounded-[14px] mt-10px hover:bg-blue-700"
                                >
                                    {menu.icone}
                                </Link>
                            ),
                        )}
                    </div>
                </div>
                <div className="flex justify-center mt-10px">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button>
                                <div className="static min-h-[36px] flex items-center min-w-[36px] justify-center  mt-10px">
                                    <img src={usuario?.foto} className="w-[36px] h-[36px] rounded-[14px]" alt="" />
                                    <span
                                        className={`
                                                fixed inline-flex rounded-full h-3 w-3  mt-[26px] mr-[30px]
                                                ${usuario?.statusChat === 1 && 'bg-green-500'}
                                                ${usuario?.statusChat === 2 && 'bg-red-500'}
                                                ${usuario?.statusChat === 3 && 'bg-gray-500'}
                                            `}
                                    />
                                </div>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="fixed w-auto mt-1 ml-40px bottom-40px bg-white divide-y divide-gray-100 rounded-[4px] shadow-lg border  ">
                                <div className=" py-1 ">
                                    <DropdownMenuAlterarStatus />
                                    <DropdownMenuSairSistema />
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

const MenuChats = ({ menu }: { menu: IMenu }) => {
    const chatsAndamento = useAppSelector((state) => state.chatsAndamento);
    const chatsFila = useAppSelector((state) => state.chatsAguardando);

    const chatComMensagem = chatsAndamento.find((chat) => chat.novaMensagem !== 0);

    return (
        <Link
            to={menu.url}
            className="relative min-h-[36px] bg-blue-500 flex items-center min-w-[36px] justify-center rounded-[14px] mt-10px hover:bg-blue-700"
        >
            {menu.icone}

            {chatComMensagem || chatsFila.length > 0 ? (
                <span className="fixed inline-flex rounded-full h-3 w-3 bg-red-600 mb-[26px] ml-[26px]" />
            ) : null}
        </Link>
    );
};

const DropdownMenuAlterarStatus = () => {
    const { usuario } = useAppSelector((state) => state.usuario);

    const dispatch = useAppDispatch();

    const alterarStatus = () => {
        socket.emit(
            'usuario_atualizar_status',
            {
                idUsuario: usuario?._id,
                statusChat: usuario?.statusChat === 1 ? 2 : 1,
            },
            (callback: ICallbackSocket) => {
                if (callback?.erro) {
                    return toastError(callback.erro.mensagem);
                }

                dispatch(setUsuarioStatus(usuario?.statusChat === 1 ? 2 : 1));
            },
        );
    };

    return (
        <Menu.Item>
            <button
                type="button"
                className="flex items-center w-full px-10px py-[2px] text-padrao hover:bg-gray-100 text-normal"
                onClick={alterarStatus}
            >
                <div className="w-[16px] h-[16px] flex items-center mr-[6px]">
                    <div
                        className={`
                            rounded-full  h-[10px] w-[10px]
                            ${usuario?.statusChat === 2 && 'bg-green-500'}
                            ${usuario?.statusChat === 1 && 'bg-red-500'}
                            ${usuario?.statusChat === 3 && 'bg-gray-500'}
                        `}
                    />
                </div>

                <div>
                    {usuario?.statusChat === 2 && 'Ficar Online'}
                    {usuario?.statusChat === 1 && 'Ficar Ausente'}
                </div>
            </button>
        </Menu.Item>
    );
};

const DropdownMenuSairSistema = () => {
    const [, , removeCookie] = useCookies([authToken.nomeToken]);

    const sair = () => {
        window.location.reload();

        removeCookie(authToken.nomeToken);
    };

    return (
        <Menu.Item>
            <button
                type="button"
                className="flex items-center w-full px-10px py-[2px] text-padrao hover:bg-gray-100 text-normal"
                onClick={sair}
            >
                <img
                    src="https://img.icons8.com/fluency-systems-regular/48/4D4D4D/exit.png"
                    className="w-[16px] mr-[6px]"
                    alt=""
                />
                <span>Sair</span>
            </button>
        </Menu.Item>
    );
};
