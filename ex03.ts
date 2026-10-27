export {};

// Tipo de objeto escrito diretamente na anotação (sem type/interface)
const paciente1: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 98888-1111' },
};

// Só os campos obrigatórios (reaproveita o tipo do primeiro com typeof)
const paciente2: typeof paciente1 = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alergias =
    p.alergias && p.alergias.length > 0
      ? `Alergias: ${p.alergias.join(', ')}`
      : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${alergias}`;
}

console.log(resumo(paciente1));
console.log(resumo(paciente2));

// Erros provocados
// paciente1.cpf = '000.000.000-00'; // Cannot assign to 'cpf' because it is a read-only property. (ts2540)
// paciente1.peso = 70;              // Property 'peso' does not exist on type '{ readonly cpf: string; ... }'. (ts2339)

// Reflexão: object × Object × {}
let dados: object = paciente1;
// console.log(dados.nome); // Property 'nome' does not exist on type 'object'. (ts2339)
// Por que dá erro? O tipo `object` só diz "isto é um valor não primitivo
// (objeto, array, função...)". Ele não carrega nenhuma informação sobre quais
// propriedades existem, então o compilador não deixa acessar `nome`.
// Para ler `nome` seria preciso um tipo mais específico (o tipo do paciente).

let x: {} = 10; // aceito
// let y: object = 10; // Type 'number' is not assignable to type 'object'. (ts2322)
// `{}` significa "qualquer valor que não seja null nem undefined", e isso inclui
// primitivos como number, string e boolean (que têm propriedades/métodos, como
// toFixed). Já `object` representa somente valores NÃO primitivos, então o 10
// (um number primitivo) é rejeitado.
void dados;
void x;
