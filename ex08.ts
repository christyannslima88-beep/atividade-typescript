export {};

// 1) number | string e estreitamento com typeof
const codigo: number | string = 42;

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  // c é string aqui ('CLI-0042' ou até '42')
  const digitos = c.replace(/\D/g, '');
  return `CLI-${digitos.padStart(4, '0')}`;
}

// 2) Tipo literal
type Tamanho = 'P' | 'M' | 'G' | 'GG';
let camiseta: Tamanho = 'M';
// camiseta = 'XG'; // Type '"XG"' is not assignable to type 'Tamanho'. (ts2322)

// 3) Frete por região
type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';

function calcularFrete(regiao: Regiao): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

// 4) string | null
function mostrarComplemento(complemento: string | null): string {
  return complemento === null ? '(sem complemento)' : complemento;
}

// 5) Só os dígitos
function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

// 6) Inferência de literais
const r = 'sul'; // const: o tipo inferido é o literal 'sul'
let r2 = 'sul'; // let: o tipo é alargado (widening) para string
// calcularFrete(r2); // Argument of type 'string' is not assignable to parameter of type 'Regiao'. (ts2345)
// Explicação: com const o valor nunca muda, então o TS guarda o tipo literal
// 'sul', que cabe em Regiao. Com let o valor pode mudar depois, então o TS
// infere o tipo mais amplo `string`, que não cabe em uma união de literais.
let r3 = 'sul' as const; // correção: mantém o tipo literal 'sul'

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
console.log(`Entrega: Rua das Flores, 100 - ${mostrarComplemento(null)}`);
console.log(`Frete para o ${r}: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);

// Extras de teste
console.log(formatarCodigo('CLI-0042'), limparTelefone(69999990000), calcularFrete(r3));
void r2;
