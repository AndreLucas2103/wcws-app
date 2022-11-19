import { InputHTMLAttributes } from "react";
import { regexCEP, regexCNPJ, regexCPF, regexData, regexDinheiro, regexTelefone } from "../text/formatoRegex";

export const InputTelefone = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexTelefone(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputCPF = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexCPF(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputCEP = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexCEP(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputData = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexData(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputCNPJ = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {
    return (
        <input
            type="text"
            className="input-simples w-full"
            onChange={(e) => changeMask(regexCNPJ(e.target.value))}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}

export const InputDinheiro = ({ inputAttr, changeMask }: { inputAttr?: InputHTMLAttributes<HTMLInputElement>, changeMask: any }) => {

    function stringToNumber(valor: string) {
        if(valor === "") return "";
        return Number(valor)
    }

    return (
        <input
            type="number"
            className="input-simples w-full disabled:bg-cinza"
            onChange={(e) => changeMask(
                stringToNumber(regexDinheiro(e.target.value))
            )}
            step={0.01}
            {...inputAttr}
            value={inputAttr?.value || ""} // deve ficar abaixo devido ao atributo ser setado depois
        />
    )
}
