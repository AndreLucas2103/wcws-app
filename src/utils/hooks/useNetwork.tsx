import { useEffect, useState } from "react";

export function useNetwork() {
    const [state, setState] = useState(() => {
        return {
            since: undefined,
            online: navigator.onLine,
            ...getNetworkConnectionInfo(),
        };
    });

    function getNetworkConnection() {
        const { navigator }: any = window;

        return (
            navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection ||
            null
        );
    }

    function getNetworkConnectionInfo() {
        const connection = getNetworkConnection();
        if (!connection) {
            return {};
        }
        return {
            rtt: connection.rtt,
            type: connection.type,
            saveData: connection.saveData,
            downLink: connection.downLink,
            downLinkMax: connection.downLinkMax,
            effectiveType: connection.effectiveType,
        };
    }

    useEffect(() => {

        const handleOnline = () => {
            setState((prevState): any => ({
                ...prevState,
                online: true,
                since: new Date().toString(),
            }));
        };

        const handleOffline = () => {
            setState((prevState): any => ({
                ...prevState,
                online: false,
                since: new Date().toString(),
            }));
        };

        const handleConnectionChange = () => {
            setState((prevState) => ({
                ...prevState,
                ...getNetworkConnectionInfo(),
            }));
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        const connection = getNetworkConnection();
        connection?.addEventListener("change", handleConnectionChange);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            connection?.removeEventListener("change", handleConnectionChange);
        };
    }, []);

    return { ...state }
}

