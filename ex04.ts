export {};

type Item = { nome: string; preco: number; quantidade: number };

const itens: Item[] = [
  { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];

// map, filter, reduce (sem for)
const nomes: string[] = itens.map((i) => i.nome);
const caros: Item[] = itens.filter((i) => i.preco > 10);
const total: number = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

// readonly
const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Higiene'); // Property 'push' does not exist on type 'readonly string[]'. (ts2339)

// Matriz: quantidade de itens em cada posição das 3 prateleiras
const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
const totalNaDespensa: number = despensa.reduce(
  (acc, prateleira) => acc + prateleira.reduce((soma, qtd) => soma + qtd, 0),
  0
);

// Desestruturação e spread
const [primeiro, segundo] = itens;
const novaLista: Item[] = [...itens, { nome: 'Açúcar 1kg', preco: 5.2, quantidade: 2 }];

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((i) => i.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${totalNaDespensa}`);

// Extras (desestruturação / spread)
console.log(`Primeiro e segundo: ${primeiro.nome} e ${segundo.nome}`);
console.log(`Original: ${itens.length} itens | Nova lista: ${novaLista.length} itens`);
console.log(`Categorias: ${categorias.join(', ')}`);
