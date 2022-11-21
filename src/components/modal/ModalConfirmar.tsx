import React, { useState, Fragment, useImperativeHandle } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface IModalConfirmarProps {
    button?: {
        children: JSX.Element,
        className?: string;
        onClick?: () => void;
    },
    buttonCustom?: JSX.Element
    panelClassName?: string;
    onOpen?: (v: boolean) => void,
    children?: JSX.Element;
    textTitle?: JSX.Element | string;
    icon?: "cancelar" | "erro" | "informacao" | "excluir" | "none";
    acaoConfirmar: () => 200 | true | void | Error | null | undefined | 400 | "error" | "erro";
    custom?: {
        buttonConfirmar?: {
            text?: string;
            button?: JSX.Element
        };
        buttonCancelar?: {
            text?: string;
            button?: JSX.Element
        };
    };
    isOpen?: boolean;
    setIsOpen?: (v: boolean) => void;
}

export interface IModalSimplesRef {
    openModal: () => void;
    closeModal: () => void;
}

const iconErro = <img src="https://img.icons8.com/color/48/000000/error--v1.png" />
const iconCancelar = <img src="https://img.icons8.com/color/48/000000/cancel-2--v1.png" />
const iconInformacao = <img src="https://img.icons8.com/color/48/000000/info--v1.png" />
const iconExcluir = <img src="https://img.icons8.com/color/48/000000/delete-sign--v1.png" />

export const ModalConfirmar = React.forwardRef<IModalSimplesRef, IModalConfirmarProps>(({
    button,
    buttonCustom,
    children,
    panelClassName,
    onOpen,
    textTitle,
    icon = "cancelar",
    acaoConfirmar,
    custom,
    isOpen: stateOpen,
    setIsOpen: setStateOpen
}: IModalConfirmarProps, ref) => {
    let [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        closeModal() {
            onOpen && onOpen(false)
            setStateOpen ? setStateOpen(false) : setIsOpen(false)
        },
        openModal() {
            onOpen && onOpen(true)
            setStateOpen ? setStateOpen(true) : setIsOpen(true)
        },
    }));

    function closeModal() {
        onOpen && onOpen(false)
        setStateOpen ? setStateOpen(false) : setIsOpen(false)
    }

    function openModal() {
        onOpen && onOpen(true)
        setStateOpen ? setStateOpen(true) : setIsOpen(true)
    }

    function actionConfirm() {
        const res = acaoConfirmar()

        if (res === 200 || res === true || res === null || res === undefined) {
            closeModal()
        }
    }

    return (
        <>
            {
                buttonCustom ?
                    <span
                        className='w-full h-full'
                        onClick={() => {
                            openModal();
                        }}
                    >
                        {buttonCustom}
                    </span>
                    :
                    <button
                        type="button"
                        onClick={() => {
                            openModal();
                            button?.onClick && button?.onClick()
                        }}
                        className={button?.className}
                    >
                        {button?.children}
                    </button>
            }

            {
                isOpen || stateOpen ?
                    <Transition appear show={stateOpen && setStateOpen ? stateOpen : isOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={() => {
                                if (event instanceof PointerEvent === false) {
                                    closeModal()
                                }
                            }}
                        >

                            <div className="fixed inset-0 bg-black bg-opacity-25" />

                            <div className="fixed inset-0 overflow-y-auto ">
                                <div className="flex min-h-full items-center justify-center text-center"

                                >
                                    <Dialog.Panel
                                        className={`
                                    inline-block text-padrao  text-left align-middle transition-all transform bg-branco shadow-lg rounded-[4px] my-[10px] 
                                    ${panelClassName ? panelClassName : "w-1/2"} 
                                `}
                                    >
                                        <Dialog.Title
                                            className="px-5 py-[14px] flex items-center justify-between"
                                        >
                                            <div className='text-fontes text-14px flex'>
                                                {icon === "cancelar" && iconCancelar}
                                                {icon === "erro" && iconErro}
                                                {icon === "excluir" && iconExcluir}
                                                {icon === "informacao" && iconInformacao}
                                                <div className='flex items-center ml-[10px]'>
                                                    <p className='text-16px font-[500]'>
                                                        {textTitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="float-right text-gray-300 hover:text-gray-400" onClick={closeModal}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </Dialog.Title>

                                        <div className='px-20px'>
                                            {children}
                                        </div>

                                        <div className="flex px-20px py-20px">

                                            {
                                                custom?.buttonConfirmar?.button ?
                                                    <button
                                                        type="button"
                                                        onClick={acaoConfirmar}
                                                    >
                                                        {custom.buttonConfirmar.button}
                                                    </button>
                                                    :
                                                    <button
                                                        type="button"
                                                        className="px-3 py-1 bg-green-600 text-branco rounded-[4px] text-sm hover:bg-green-700"
                                                        onClick={actionConfirm}
                                                    >
                                                        {
                                                            custom?.buttonConfirmar?.text
                                                            ||
                                                            <span className='flex'>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" /></svg>
                                                                <span className='ml-1' >Sim</span>
                                                            </span>
                                                        }
                                                    </button>
                                            }

                                            {
                                                custom?.buttonCancelar?.button ?
                                                    <button
                                                        type="button"
                                                        className="px-3 py-1 bg-gray-200 rounded-[4px] text-sm ml-2 mr-1 hover:bg-gray-300"
                                                        onClick={closeModal}
                                                    >
                                                        Não
                                                    </button>
                                                    :
                                                    <button
                                                        type="button"
                                                        className="px-3 py-1 bg-gray-200 rounded-[4px] text-sm ml-2 mr-1 hover:bg-gray-300"
                                                        onClick={closeModal}
                                                    >
                                                        {custom?.buttonCancelar?.text || "Não"}
                                                    </button>
                                            }

                                            <button
                                                type="button"
                                                className="ml-2 button-voltar text-12px hover:underline"
                                                onClick={closeModal}
                                            >
                                                Voltar
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>

                        </Dialog>
                    </Transition>
                    :
                    null
            }

        </>
    )
})