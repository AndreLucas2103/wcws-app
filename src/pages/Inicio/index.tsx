import { useAppSelector } from "@/utils/hooks/useRedux";

export const Inicio = () => {
    const { usuario } = useAppSelector((state) => state.usuario);

    return (
        <div>
            {usuario?.nomeCompleto} - {usuario?.statusChat}
        </div>
    )
}