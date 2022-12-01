import ReactSelect, { components, DropdownIndicatorProps, OptionProps, NoticeProps } from 'react-select';

interface ISelect<TypeOption> {
    itens?: TypeOption[];
    itensCustom?: { label: string | JSX.Element; data: TypeOption }[]; // customizar itens
    setSelecionado: (v: TypeOption) => void;
    selecionado?: TypeOption; // insere o valor
    selecionadoItensCustom?: TypeOption extends null
        ? { label: string | JSX.Element; data: TypeOption } | null
        : { label: string | JSX.Element; data: TypeOption }; // valida se vai ter o null no campo do item selcionado, utilizado para inserir o valor do itens customizado
    optionNull?: boolean; // se terá o campo null ou não adicionado aos itens
    isSearchable?: boolean; // se o input será possível pesquisar ou não
    onSearch?: (v: string) => void; // onChange
    fieldLabel?: TypeOption extends undefined ? undefined : keyof TypeOption; // se tipo foi undefined, ele não pede nada, se não for, pegara as keys da tipagem
    isDisabled?: boolean;
}

export const Select = <TypeOption,>({
    itens,
    itensCustom,
    setSelecionado,
    selecionadoItensCustom,
    selecionado,
    optionNull,
    onSearch,
    fieldLabel,
    isSearchable = true,
    isDisabled,
}: ISelect<TypeOption>) => {
    const DropdownIndicator = (props: DropdownIndicatorProps<{ label: string | JSX.Element; data: TypeOption }>) => {
        return (
            <components.DropdownIndicator {...props}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-branco"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </components.DropdownIndicator>
        );
    };

    const Option = (props: OptionProps<{ label: string | JSX.Element; data: TypeOption }>) => {
        return (
            <components.Option
                {...props}
                className="cursor-pointer select-none relative py-1 pl-5  hover:bg-orange-50 text-12px text-gray-800"
            />
        );
    };

    const NoOptionsMessage = (props: NoticeProps<{ label: string | JSX.Element; data: TypeOption }>) => {
        return (
            <components.NoOptionsMessage {...props} className=" select-none relative py-1 pl-5 text-12px text-gray-800">
                Nenhuma opção
            </components.NoOptionsMessage>
        );
    };

    let options: { label: string | JSX.Element; data: TypeOption }[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function generateLabel(i: any): string {
        if (i === null && optionNull) return '- - -';
        if (i === null) return '';

        return i[fieldLabel] || i.label;
    }

    if (itensCustom) {
        options = itensCustom;

        optionNull && options.unshift({ label: '- - -', data: null as TypeOption });
    }

    if (itens) {
        options = itens?.map((i) => ({
            label: generateLabel(i),
            data: i as TypeOption,
        }));

        optionNull && options.unshift({ label: '- - -', data: null as TypeOption });
    }

    return (
        <ReactSelect
            isMulti={false}
            components={{ DropdownIndicator, Option, NoOptionsMessage }}
            options={options}
            isDisabled={isDisabled}
            styles={{
                control: () => ({
                    width: '100%',
                    minHeight: '32px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    display: 'flex',
                    borderWidth: '1px',
                    borderColor: 'rgb(204 204 204)',
                    fontSize: '14px',
                    color: 'rgb(57 57 57 / var(--tw-text-opacity))',
                    fontWeight: 'normal',
                    cursor: 'pointer',
                    '*': {
                        boxShadow: 'none !important',
                    },
                }),
                indicatorSeparator: () => ({
                    display: 'none',
                }),
                clearIndicator: () => ({
                    display: 'none',
                }),
                indicatorsContainer: () => ({
                    display: 'flex',
                    alignItems: 'center',
                    margin: '8px',
                }),
                dropdownIndicator: () => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    height: '20px',
                    width: '20px',
                    backgroundColor: '#1F74F3',
                    borderRadius: '4px',
                }),
                option: () => ({}),
                noOptionsMessage: () => ({}),
                menuList: (base) => ({
                    ...base,
                    '::-webkit-scrollbar': {
                        width: '4px',
                        height: '0px',
                    },
                    '::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: '#888',
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                }),
            }}
            onChange={(v) => {
                setSelecionado && setSelecionado(v?.data as TypeOption);
            }}
            isSearchable={isSearchable}
            onInputChange={(v) => {
                onSearch && onSearch(v);
            }}
            value={
                itensCustom
                    ? selecionadoItensCustom === null && optionNull
                        ? { label: '- - -', data: null as TypeOption }
                        : selecionadoItensCustom
                    : { label: generateLabel(selecionado), data: selecionado as TypeOption }
            }
            placeholder=""
        />
    );
};
