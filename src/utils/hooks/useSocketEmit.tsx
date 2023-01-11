import { toastError, toastSuccess } from 'components/avisos/toast';
import { ISocketResponse } from 'interfaces/ISocketResponse';
import { socket } from '../providers/SocketIoProvider';

export function useSocketEmit<TDataSend, TDataCallBack = unknown>(
    event: string,
    options?: {
        onSucess?: (data: TDataCallBack) => void;
        callback?: (data: ISocketResponse<TDataCallBack>) => void;
        messageError?: string | null | undefined; // secaso seja null, não será exibido nenhuma mensagem de erro
        messageSucess?: string | undefined; // caso seja undefined, não será exibido nenhuma mensagem de sucesso
    },
) {
    function emit(data: TDataSend) {
        socket.emit(event, data, (data: ISocketResponse<TDataCallBack>) => {
            if (options?.callback) options.callback(data);

            if (!data.erro) {
                if (options?.messageSucess) {
                    toastSuccess(options?.messageSucess || 'Operação realizada');
                }

                if (options?.onSucess) options.onSucess(data.data);
            }

            if (options?.messageError !== null && data.erro?.codigo) {
                toastError(options?.messageError || data.erro?.mensagem || 'Ocorreu um erro');
            }
        });
    }

    return {
        emit,
    };
}
