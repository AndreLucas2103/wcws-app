import { PropsWithChildren, useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast"

export const ToastProvider = ({ children }: { children: PropsWithChildren }) => {

    const { toasts } = useToasterStore();

    useEffect(() => { // remover os toast, para que seja exibido somente 1 sempre
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= 1) // Is toast index over limit?
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);

    return (
        <>
            {children}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    duration: 3000,
                    style: {
                        color: '#fff',
                        fontSize: '14px',
                    },
                    // Default options for specific types
                    success: {
                        style: {
                            background: '#009900',
                        },
                    },
                    error: {
                        duration: 5000,
                        style: {
                            background: '#cc2121',
                        },
                    },
                }}
            /> {/* Notificação toas do sistema */}
        </>
    )
}