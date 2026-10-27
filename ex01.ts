export {};

// 1) Variáveis com anotação de tipo explícita
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

// 2) Sem anotação: o TypeScript infere o tipo
let aberta = true; // tipo inferido: boolean

// 3) Cálculos
const subtotal1: number = precoUnitario1 * quantidade1;
const subtotal2: number = precoUnitario2 * quantidade2;
const total: number = subtotal1 + subtotal2;

// 4) Separador numérico
const paesVendidosNoAno: number = 1_250_000;

// 5) Hexadecimal (ao imprimir, o número aparece em decimal)
const categoria: number = 0x1a;

// 6) Erro provocado
// quantidade1 = 'doze'; // Type 'string' is not assignable to type 'number'. (ts2322)

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidosNoAno}`);
console.log(`Categoria: ${categoria}`);
