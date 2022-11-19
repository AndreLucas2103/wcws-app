// (00) 00000-0000 ou (00) 0000-0000
export function regexTelefone(value: string): string {
    const qtdDigitos = value?.replace("(", "").replace(")", "").replace("-", "").replace(" ", "").length;

    value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2')

    if (qtdDigitos > 10) value = value?.replace(/(\d{5})(\d{4})/, '$1-$2');
    else value = value.replace(/(\d{4})(\d{4})/, '$1-$2');

    return value.replace(/(-\d{4})\d+?$/, '$1') // captura 4 numeros seguidos de um traço e não deixa ser digitado mais nada
}

// 000.0000.000-00
export function regexCPF(value: string): string {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

// 00000-000
export function regexCEP(value: string): string {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, '$1') // captura 3 numeros seguidos de um traço e não deixa ser digitado mais nada
};

// 00/00/0000
export function regexData(value: string): string {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1");
};


// 00.000.000/0000-00
export function regexCNPJ(value: string): string {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

// Regex para aceitar apenas números e pontuação ". and ,", 000.00, permite apenas 2 numeros apos a pontuação
export function regexDinheiro(value: string): string {
    return value
        .replace(/[^\d.,]+/g, '')
        .replace(/[.,](?![^,.]*$)/g, '')
        .replace(/(\,\d{2})\d*$/, '$1')
        .replace(/(\.\d{2})\d*$/, '$1')
}
