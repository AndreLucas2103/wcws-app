import { useNetwork } from "@/utils/hooks/useNetwork"
import { socket } from "@/utils/services/socketio"
import { Menu, Transition } from "@headlessui/react"
import { toastError } from "components/avisos/toast"
import { ICallbackSocket } from "interfaces/ICallbackSocket"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import { setUsuarioStatus } from "redux/store/actions/Usuario.action"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/useRedux"
import { IMenu, menus } from "./menus"

export const NavMenu = () => {
    const { usuario } = useAppSelector(state => state.usuario)

    const { online } = useNetwork()

    return (
        <nav className="h-full bg-blue-600 rounded-[20px] py-20px flex justify-center w-full">

            <div className="flex flex-col h-full justify-between">
                <div className="flex justify-center mb-10px">
                    <div>
                        <img src="https://img.icons8.com/ios/50/FFFFFF/react-native--v1.png" className="w-[30px]" />
                    </div>
                </div>
                <div
                    className="flex items-center justify-center overflow-y-auto  overflow-x-hidden scrollbar-navMenu"
                >
                    <div className="h-full flex flex-col ">
                        {
                            menus.map((menu, index) =>
                                menu.titulo === "Chats" ?
                                    <MenuChats
                                        key={index}
                                        menu={menu}
                                    />
                                    :
                                    <Link
                                        key={index}
                                        to={menu.url}
                                        className="static min-h-[36px] bg-blue-500 flex items-center min-w-[36px] justify-center rounded-[14px] mt-10px hover:bg-blue-700"
                                    >
                                        {menu.icone}
                                    </Link>

                            )
                        }
                    </div>
                </div>
                <div className="flex justify-center mt-10px">


                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button>
                                <div className="static min-h-[36px] flex items-center min-w-[36px] justify-center  mt-10px">
                                    {
                                        online ?
                                            <>
                                                <img src={usuario?.foto} className="w-[36px] h-[36px] rounded-[14px]" />

                                                <span
                                                    className={`
                                                fixed inline-flex rounded-full h-3 w-3  mt-[26px] mr-[30px]
                                                ${usuario?.statusChat === 1 && "bg-green-500"}
                                                ${usuario?.statusChat === 2 && "bg-red-500"}
                                                ${usuario?.statusChat === 3 && "bg-gray-500"}
                                            `}
                                                />
                                            </>
                                            :
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>

                                    }

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
    )
}

const MenuChats = ({ menu }: { menu: IMenu }) => {

    const chatsAndamento = useAppSelector(state => state.chatsAndamento)
    const chatsFila = useAppSelector(state => state.chatsAguardando)

    const chatComMensagem = chatsAndamento.find(chat => chat.novaMensagem !== 0)

    return (
        <Link
            to={menu.url}
            className="static min-h-[36px] bg-blue-500 flex items-center min-w-[36px] justify-center rounded-[14px] mt-10px hover:bg-blue-700"
        >
            {menu.icone}
            {
                chatComMensagem || chatsFila.length > 0 ?
                    <span className="fixed inline-flex rounded-full h-3 w-3 bg-red-600 mb-[26px] ml-[26px]" />
                    : null
            }
        </Link>
    )
}

const DropdownMenuAlterarStatus = () => {
    const { usuario } = useAppSelector(state => state.usuario)

    const dispatch = useAppDispatch()

    const alterarStatus = () => {
        socket.emit('usuario_atualizar_status', {
            idUsuario: usuario?.id,
            statusChat: usuario?.statusChat === 1 ? 2 : 1
        }, (callback: ICallbackSocket) => {
            if (callback?.erro) {
                return toastError(callback.erro.mensagem)
            }

            dispatch(setUsuarioStatus(usuario?.statusChat === 1 ? 2 : 1))
        })
    }

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
                            ${usuario?.statusChat === 2 && "bg-green-500"}
                            ${usuario?.statusChat === 1 && "bg-red-500"}
                            ${usuario?.statusChat === 3 && "bg-gray-500"}
                        `}
                    />
                </div>


                <div>
                    {usuario?.statusChat === 2 && "Ficar Online"}
                    {usuario?.statusChat === 1 && "Ficar Ausente"}
                </div>
            </button>
        </Menu.Item>
    )
}

const DropdownMenuSairSistema = () => {
    const sair = () => {
        window.location.reload()
    }

    return (
        <Menu.Item>
            <button
                type="button"
                className="flex items-center w-full px-10px py-[2px] text-padrao hover:bg-gray-100 text-normal"
                onClick={sair}
            >
                <img src="https://img.icons8.com/fluency-systems-regular/48/4D4D4D/exit.png" className="w-[16px] mr-[6px]" />
                <span>Sair</span>
            </button>
        </Menu.Item>
    )
}