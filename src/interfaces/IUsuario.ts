export interface IUsuario {
    _id: string;
    primeiroNome: string;
    nomeCompleto: string;
    email: string;
    foto: string;
    administrador: boolean;
    situacao: 1 | 2; // 1-ativo, 2-inativo
    statusChat: 1 | 2 | 3; // 1-online, 2-ausente, 3-offline
    socketId: string;
}