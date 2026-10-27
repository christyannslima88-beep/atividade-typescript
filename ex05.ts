export {};

type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

const temperaturas: number[] = leituras.map((l) => l[1]);
const [minima, maxima] = extremos(temperaturas);
const media: number = temperaturas.reduce((acc, t) => acc + t, 0) / temperaturas.length;

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// Tupla com elemento opcional
type Contato = [nome: string, telefone: string, email?: string];
const contato1: Contato = ['Redação Central', '(69) 3333-0000', 'redacao@noticias.com'];
const contato2: Contato = ['Plantão', '(69) 3333-1111'];
for (const [nome, telefone, email] of [contato1, contato2]) {
  console.log(`${nome} - ${telefone} - ${email ?? '(sem e-mail)'}`);
}

// Tupla com elemento rest
const historico: [string, ...number[]] = ['Porto Velho', 34, 33, 35, 36, 32, 31, 34];
const [cidadeHist, ...temps] = historico;
const mediaSemana: number = temps.reduce((acc, t) => acc + t, 0) / temps.length;
console.log(`Média semanal de ${cidadeHist}: ${mediaSemana.toFixed(1)}°C`);

// readonly
const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC'; // Cannot assign to '0' because it is a read-only property. (ts2540)
console.log(`Capital: ${capitalOficial[1]} (${capitalOficial[0]})`);
