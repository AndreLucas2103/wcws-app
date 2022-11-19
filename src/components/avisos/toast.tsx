import toast from 'react-hot-toast'

export const toastError = (mensagem?: string) => {
    if (!mensagem) return toast.error("Ocorreu um erro")

    return toast.error(mensagem)
}

export const toastSuccess = (mensagem?: string) => {
    if (!mensagem) return toast.success('Operação realizada');

    return toast.success(mensagem)
}
