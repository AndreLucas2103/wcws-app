import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom";
import { chatsAguardandoRemoverTodos } from "redux/store/actions/ChatsAguardando.action";
import { chatsAndamentoSocketDesconectado } from "redux/store/actions/ChatsAndamento.action";
import { LoadingSpinnerPage } from "./components/spinner/SpinnerLoading"
import { AppRoutes } from "./routes/AppRoutes"
import { useAppDispatch } from "./utils/hooks/useRedux";
import { SocketIoProvider } from "./utils/providers/SocketIoProvider";
import { ToastProvider } from "./utils/providers/ToastProvider";
import { socket } from "./utils/services/socketio";

import { parse } from "cookie";
const COOKIE_NAME = "AWSALB";

export const App = () => {
    const [socketConnected, setIsConnected] = useState(false);

    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.io.on("reconnect_attempt", (attempt) => {
            console.log(attempt)
        });

        socket.on('disconnect', (reason) => {
            dispatch(chatsAndamentoSocketDesconectado())
            dispatch(chatsAguardandoRemoverTodos())
            setIsConnected(false);
        });

        socket.io.on('ping', () => {
            console.log('ping')
        })

        socket.io.on("open", () => {
            socket.io.engine.transport.on("pollComplete", () => {
                const request = socket.io.engine.transport.pollXhr.xhr;

                if (request.getAllResponseHeaders().indexOf("set-cookie") >= 0) {
                    const cookieHeader = request.getResponseHeader("set-cookie");

                    if (!cookieHeader) {
                        return;
                    }

                    console.log(cookieHeader)

                    cookieHeader.forEach((cookieString: any) => {
                        if (cookieString.includes(`${COOKIE_NAME}=`)) {
                            const cookie = parse(cookieString);
                            socket.io.opts.extraHeaders = {
                                cookie: `${COOKIE_NAME}=${cookie[COOKIE_NAME]}`
                            }
                        }
                    });
                }
            });
        });


        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <ToastProvider> {/* Provider do toast, para avisos */}
            <LoadingSpinnerPage /> {/* rodar o spinner da aplicação*/}

            <BrowserRouter>
                <SocketIoProvider>
                    <AppRoutes />
                </SocketIoProvider>
            </BrowserRouter>

        </ToastProvider>

    )
}

