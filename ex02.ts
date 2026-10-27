export {};

const nomeDigitado: string = ' maria da silva ';

const PALAVRAS_MINUSCULAS: string[] = ['da', 'de', 'do'];

function formatarNome(nome: string): string {
  return nome
    .trim()
    .split(' ')
    .filter((palavra) => palavra !== '') // remove espaços duplicados
    .map((palavra) => {
      const minuscula = palavra.toLowerCase();
      if (PALAVRAS_MINUSCULAS.indexOf(minuscula) !== -1) {
        return minuscula;
      }
      return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
    .join(' ');
}

// Conversões de texto para número
const precoLido: string = '12.40';
const quantidadeLida: string = '3un';
const preco: number = Number(precoLido); // 12.4
const quantidade: number = parseInt(quantidadeLida, 10); // 3

const clienteFidelidade: boolean = true;
const numeroCupom: number = 42;

const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const totalFinal: number = subtotal - desconto;

const cupom: string = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalFinal.toFixed(2)}`;

console.log(cupom);
