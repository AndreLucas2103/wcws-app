export interface ICallbackSocket<T = unknown> {
    data: T,
    erro?: {
        codigo: string,
        mensagem: string
        detalhe?: string
    }
}