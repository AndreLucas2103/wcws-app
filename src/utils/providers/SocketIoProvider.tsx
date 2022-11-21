import { PropsWithChildren, useEffect, useState } from "react"
import socketIOClient from "socket.io-client";
import { useSocketEmit } from "../hooks/useSocketEmit";

export const socket = socketIOClient("http://localhost:3030", {
    auth: {
        token: ""
    },
});

export const SocketIoProvider = ({ children }: { children: PropsWithChildren }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', (reason) => {
            console.log(reason)
            setIsConnected(false);
        });

        socket.on('exception', (data) => console.log(data));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('teste');
        };
    }, []);

    const { emit } = useSocketEmit({

    })

    return (
        <>
            <div>
                <p>Connected: {'' + isConnected}</p>
                <button onClick={() => {
                    emit('teste', { 'name': '123' })
                }}>Send ping</button>
            </div>
            {/* {children} */}
        </>
    )
}