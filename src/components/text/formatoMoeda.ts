
// R$ 0.000,00
export const moedaReal = (valor: string | number) => {
    const money = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})
    return money
}