export const AcessoRestrito = () => {
    return null
}

/* 
import { useDispatch, useSelector } from "react-redux";
import { setAcessoRestrito } from "../../redux/store/actions/Geral.action";
import { RootState } from "../../redux/store/reducers";
import { ModalSimples } from "../modal/ModalSimples"


export const AcessoRestritoModal = () => {
    const { acessoRestrito } = useSelector((state: RootState) => state.geral); // busca o usuario no redux
    const dispatch = useDispatch()

    const fechar = () => {
        dispatch(setAcessoRestrito({
            aberto: false,
            codigoPermissao: ""
        }))
    }

    return (
        <div>
            <ModalSimples
                open={acessoRestrito.aberto}
                setOpen={fechar}
                className="w-[300px]"
                disableEsc
            >
                <div className="flex justify-center">
                    <img src="https://icon-v1.vercel.app/cadeado.svg" alt="" className="w-[60px]" />
                </div>
                <div className="text-center mt-[10px]">
                    Acesso negado
                </div>
                <div className="text-12px text-center mx-[40px] mt-[10px] text-gray-600">
                    Você não possui permissão
                </div>
                <div className="text-12px text-center mx-[40px] mt-[10px] text-cinza3 mb-[10px]">
                    {acessoRestrito.codigoPermissao}
                </div>
            </ModalSimples>
        </div>
    )
}

export const AcessoRestritoDiv = ({ codigoPermissao }: { codigoPermissao: string }) => {
    return (
        <div>
            <div className="flex justify-center">
                <img src="https://icon-v1.vercel.app/cadeado.svg" alt="" className="w-[60px]" />
            </div>
            <div className="text-center mt-[10px]">
                Acesso negado
            </div>
            <div className="text-12px text-center mx-[40px] mt-[10px] text-gray-600">
                Você não possui permissão
            </div>
            <div className="text-12px text-center mx-[40px] mt-[10px] text-cinza3 mb-[10px]">
                {codigoPermissao}
            </div>
        </div>
    )
} */