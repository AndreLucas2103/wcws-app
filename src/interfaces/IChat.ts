import { IUsuario } from './IUsuario';

export interface IChat {
    // Interface do servidor
    _id: string;
    uid: string;
    nome: string;
    email: string;
    socketId: string | null;
    situacao: 1 | 2 | 3;
    dataInicio: Date;
    dataFim: Date | null;
    usuarioResponsavel: IUsuario[] | string[];
    usuarioFila: IUsuario | string | null;

    // interface extra para manipulacao do front;
    novaMensagem?: number;
    segundosFila?: number;
    recusado?: boolean;
}
