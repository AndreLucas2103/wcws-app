import socketIOClient from "socket.io-client";

export const socket = socketIOClient(import.meta.env.VITE_APP_URL_SOCKETIO, {
    auth: {
        token: ""
    },
    transports: ["polling", "websockets"]
    /* 'forceNew': true,
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 5000,
    'reconnectionAttempts': 5 */
});