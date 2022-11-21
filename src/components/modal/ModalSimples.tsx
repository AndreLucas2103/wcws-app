import React, { useState, Fragment, ReactNode, useImperativeHandle, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface IModalSimplesProps {
    button?: {
        className?: string;
        children?: ReactNode | string;
        onClick?: () => void;
    } | null,
    buttonCustom?: JSX.Element
    panelClassName?: string;
    onOpen?: (v: boolean) => void,
    children?: ReactNode;
    textTitle?: JSX.Element | string;
    textSubtitle?: JSX.Element | string;
    isOpen?: boolean;
    setIsOpen?: (v: boolean) => void;
}

export interface IModalSimplesRef {
    openModal: () => void;
    closeModal: () => void;
}

const ModalSimples = React.forwardRef<IModalSimplesRef, IModalSimplesProps>(({
    button,
    buttonCustom,
    children,
    panelClassName,
    onOpen,
    textTitle,
    textSubtitle,
    isOpen: stateOpen,
    setIsOpen: setStateOpen
}, ref) => {

    let [isOpen, setIsOpen] = useState(stateOpen || false)

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
                    button === null ? null :
                        <button
                            className={button?.className}
                            onClick={() => {
                                button?.onClick && button?.onClick()
                                openModal();
                            }}
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
                                    inline-block text-padrao  text-left align-middle transition-all transform bg-branco shadow-lg rounded-sm my-[10px] 
                                    ${panelClassName ? panelClassName : "w-1/2"} 
                                `}
                                    >
                                        <Dialog.Title
                                            className="p-5 bg-principal h-[50px] flex items-center justify-between"
                                        >
                                            <div className='text-gray-100 text-14px'>
                                                {textTitle} <span className='ml-10px text-10px text-cinza2'>{textSubtitle}</span>
                                            </div>
                                            <button className="float-right text-gray-300 hover:text-gray-100" onClick={closeModal}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </Dialog.Title>
                                        {children}
                                    </Dialog.Panel>
                                </div>
                            </div>

                        </Dialog>
                    </Transition>
                    : null
            }
        </>
    )
})

export { ModalSimples }