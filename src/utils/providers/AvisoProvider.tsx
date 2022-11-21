import { LoadingSpinnerPage } from "components/spinner/SpinnerLoading"
import { PropsWithChildren } from "react"

export const AvisoProvider = ({ children }: { children: PropsWithChildren }) => {
    return (
        <>
            <LoadingSpinnerPage /> {/* rodar o spinner da aplicação*/}
            {children}
        </>
    )
}