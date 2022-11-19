import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { moedaReal } from '../text/formatoMoeda';

interface ISelectAutocompleteProps {
    itens: any[]; // pode ter a opção do item ser disabled
    setSelecionado: any,
    selecionado: any,
    setPesquisa?: any,
    customTextField?: string, // o campo exibir deve ser enviado contendo os paramentros desejado em [], por exemplo: "[nome] - [valor{moedaReal}] - Meses: [meses]"
    customTextFieldFunction?: {
        field: string,
        function: string
    }[],
    maxHeightOptions?: number,
    optionNull?: boolean,
}

export function SelectAutocomplete({ setSelecionado, selecionado, itens, setPesquisa, customTextField, maxHeightOptions, customTextFieldFunction, optionNull }: ISelectAutocompleteProps) {

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

    const [query, setQuery] = useState('')

    const filteredItem = setPesquisa ? itens : query === ''
        ? itens
        : itens.filter((item) => {

            const variaveis = customTextField?.match(/\[[^\]]*]/g)?.map(v => v.slice(1, -1))

            let itemFilter: any = item.nome

            if (variaveis) {
                const obj: any = {}

                for (let i = 0; i < variaveis?.length; i++) {
                    obj[variaveis[i]] = item[variaveis[i]]
                }

                itemFilter = JSON.stringify(obj)
            }

            return itemFilter
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
        })

    const handleFocus = (event: any) => event.target.select();

    return (
        <div className="">
            <Combobox value={selecionado} onChange={setSelecionado}>
                <div className="relative">
                    <div className="relative w-full ">
                        <Combobox.Input
                            className="w-full input-simples text-left text-12px text-textos"
                            displayValue={() => {
                                return selecionado ? textField(selecionado) : selecionado === null && optionNull ? "- - -" : ''
                            }}
                            onChange={(event) => {
                                setPesquisa ? setPesquisa(event.target.value) : setQuery(event.target.value)
                            }}
                            onFocus={handleFocus}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center ">
                            <span className="flex items-center pr-2 ">
                                <div className="bg-principal rounded-[4px] w-[20px] h-[20px] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-branco" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </span>
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className={`
                            absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-branco rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm 
                            ${maxHeightOptions ? `max-h-[${maxHeightOptions}px]` : null}
                        `}>
                            {filteredItem.length === 0 && query !== '' ? (
                                <div className="cursor-default select-none relative py-2 px-4 text-12px text-textos">
                                    Não encontrado
                                </div>
                            ) : (
                                <>
                                    {
                                        optionNull && query.length === 0 &&
                                        <Combobox.Option
                                            className="cursor-pointer select-none relative py-1 pl-5  hover:bg-orange-50 text-12px text-gray-800"
                                            value={null}
                                        >
                                            <span>
                                                - - -
                                            </span>
                                        </Combobox.Option>
                                    }

                                    {
                                        filteredItem.map((item, index) => (
                                            <Combobox.Option
                                                key={index}
                                                className="cursor-pointer select-none relative py-1 pl-5  hover:bg-orange-50 text-12px text-gray-800"
                                                value={item}
                                                disabled={item.disabled}
                                            >
                                                <span>
                                                    {textField(item)}
                                                </span>
                                            </Combobox.Option>
                                        ))
                                    }
                                </>
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
