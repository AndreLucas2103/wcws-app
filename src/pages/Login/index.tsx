import { useMutation } from '@/utils/hooks/useMutation';
import { useAppDispatch } from '@/utils/hooks/useRedux';
import { socket } from '@/utils/providers/SocketIoProvider';
import { authToken } from 'config/authToken';
import { IUsuario } from 'interfaces/IUsuario';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { setUsuario } from 'redux/store/actions/Usuario.action';

interface ILoginFormData {
    email: string;
    senha: string;
}

export const Login = () => {
    const dispatch = useAppDispatch();

    const [, setCookie] = useCookies([authToken.nomeToken]);

    const { register, handleSubmit, setValue } = useForm<ILoginFormData>();

    const { mutate } = useMutation<
        { email: string; senha: string },
        {
            usuario: IUsuario;
            token: string;
        }
    >('/usuario/auth/login', {
        method: 'post',
        messageSucess: 'Usuário logado',
        onSuccess: (e) => {
            const {
                data: { usuario, token },
            } = e;

            setCookie(authToken.nomeToken, token, {
                path: '/',
            });

            // define o token em auth no socket, sempre será enviado ao servidor com ele
            socket.auth = { token: token };

            // iniciar conexão com o socket
            socket.connect();

            dispatch(
                setUsuario({
                    administrador: usuario.administrador,
                    email: usuario.email,
                    _id: usuario._id,
                    nomeCompleto: usuario.nomeCompleto,
                    primeiroNome: usuario.primeiroNome,
                    foto: usuario.foto,
                    situacao: usuario.situacao,
                    socketId: usuario.socketId,
                    statusChat: usuario.statusChat,
                }),
            );
        },
    });

    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-blue-200">
            <div className="max-w-md w-full space-y-8 bg-gray-100 p-40px rounded-[20px] ">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=500"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-medium">
                        Acessar plataforma
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(mutate)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register('email', {
                                    required: true,
                                })}
                                type="email"
                                autoComplete="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Endereço de e-mail"
                            />
                        </div>
                        <div>
                            <input
                                {...register('senha', {
                                    required: true,
                                })}
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Senha"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
                                Esqueceu a senha?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Acessar
                        </button>
                    </div>

                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setValue('email', 'usuario1@mail.com');
                                setValue('senha', '123456');
                            }}
                        >
                            usuario 1
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setValue('email', 'usuario2@mail.com');
                                setValue('senha', '123456');
                            }}
                        >
                            usuario 2
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
