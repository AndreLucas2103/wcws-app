import { IMensagem } from './IMensagem';
import { IUsuario } from './IUsuario';

export interface IChat {
    // Interface do servidor
    _id: string;
    uid: string;
    nome: string;
    email: string;
    socketId: string | null;
    situacao: 1 | 2 | 3 | 4; // 1- aguardando, 2- andamento, 3-finalizado, 4-em tranferência
    dataInicio: Date;
    dataFim: Date | null;
    usuarioResponsavel: IUsuario[] | string[];
    usuarioFila: IUsuario | string | null;

    // interface extra para manipulacao do front;
    novaMensagem?: number;
    segundosFila?: number;
    recusado?: boolean;
    mensagens?: IMensagem[];
}
