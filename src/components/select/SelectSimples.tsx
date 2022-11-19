import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { moedaReal } from '../text/formatoMoeda';

interface ISelectComumProps {
    itens: any[];
    setSelecionado: any,
    selecionado: any,
    maxHeightOptions?: number
    customTextField?: string
    customTextFieldFunction?: {
        field: string,
        function: string
    }[],
    optionNull?: boolean
}

export function SelectSimples({ itens, setSelecionado, selecionado, maxHeightOptions, customTextField, customTextFieldFunction, optionNull }: ISelectComumProps) {

    const textField = (item: any): string => {

        if (!customTextField) return item.nome

        const variaveis = customTextField.match(/\[[^\]]*]/g)
        if (!variaveis) return item.nome

        let text = customTextField;

        variaveis.forEach(v => {
            const field = v.slice(1, -1);

            const customFieldFunctionExiste = customTextFieldFunction?.find(v => v.field === field)

            if (customFieldFunctionExiste) {
                text = text.replace(v, moedaReal(item[field]))
            } else {
                text = text.replace(v, item[field]);
            }
        })

        return text
    }

    return (
        <div className="">
            <Listbox value={selecionado} onChange={setSelecionado}>
                <div className="relative">
                    <Listbox.Button className="w-full input-simples text-left text-14px text-textos">
                        <span className="block truncate ml-[10px] pr-[30px]">{
                            selecionado ? textField(selecionado) : selecionado === null && optionNull ? "- - -" : ''
                        }</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <div className="bg-principal rounded-[4px] w-[20px] h-[20px] flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-branco" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className={`absolute w-full py-1 mt-1 overflow-auto text-base z-10 bg-branco rounded-sm shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${maxHeightOptions ? `max-h-[${maxHeightOptions}px]` : null}`}>
                            {
                                optionNull &&
                                <Listbox.Option
                                    className="cursor-pointer select-none relative py-1 pl-5  hover:bg-orange-50 text-12px text-gray-800"
                                    value={null}
                                >
                                    <span>
                                        - - -
                                    </span>
                                </Listbox.Option>
                            }

                            {itens.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className="cursor-pointer select-none relative py-1 pl-5  hover:bg-orange-50 text-12px text-fontes"
                                    value={person}
                                >
                                    <span>
                                        {textField(person)}
                                    </span>
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
