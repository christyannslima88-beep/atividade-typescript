export {};

// ---------- Type aliases e literais ----------
type Placa = string;
type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

// ---------- União discriminada ----------
type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
type Veiculo = Carro | Moto | Caminhao;

// ---------- Enum ----------
enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

// ---------- Ticket ----------
type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// ---------- never para erros ----------
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// ---------- Tarifa ----------
function tarifa(primeiraHora: number, horaAdicional: number, horas: number): number {
  return primeiraHora + (horas - 1) * horaAdicional;
}

function calcularTarifa(v: Veiculo, horas: number): number {
  switch (v.tipo) {
    case 'carro':
      return tarifa(8, 5, horas);
    case 'moto':
      return tarifa(4, 2, horas);
    case 'caminhao':
      return tarifa(15, 10, horas);
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

/*
 Teste da verificação exaustiva: acrescente um tipo Van à união, sem tratá-lo no switch.

   type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };
   type Veiculo = Carro | Moto | Caminhao | Van;

 Erro no default do switch:
   Type 'Van' is not assignable to type 'never'. (ts2322)

 O que o never garantiu: se alguém adiciona um novo tipo de veículo e esquece de
 tratá-lo em calcularTarifa, o código deixa de compilar. O erro aparece na hora
 e aponta exatamente o ponto esquecido, em vez de a Van ficar sem tarifa e
 gerar um erro (ou cobrança errada) só em produção.
*/

// ---------- Fechamento do ticket ----------
function horasDe(p: Periodo): number {
  const [entrada, saida] = p;
  return Math.max(1, saida - entrada); // paga pelo menos 1 hora
}

function fecharTicket(t: Ticket): Ticket {
  const bruto = calcularTarifa(t.veiculo, horasDe(t.periodo));
  const valor = t.selo ? bruto * 0.5 : bruto;
  return { ...t, valor, situacao: SituacaoTicket.Pago }; // novo objeto, original intacto
}

function registrar(t: Ticket): void {
  const horas = horasDe(t.periodo);
  const valor = (t.valor ?? 0).toFixed(2);
  const selo = t.selo ? ' (selo -50%)' : '';
  console.log(`[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horas}h - R$ ${valor}${selo}`);
}

// ---------- Entrada externa com unknown ----------
function ehObjeto(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}

function analisarJson(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return falhar('JSON malformado');
  }
}

function lerVeiculo(json: string): Veiculo {
  const bruto = analisarJson(json);
  if (!ehObjeto(bruto)) {
    return falhar('o JSON não é um objeto');
  }

  const placa = bruto.placa;
  if (typeof placa !== 'string') {
    return falhar('campo "placa" inválido');
  }

  const tipo = bruto.tipo;
  switch (tipo) {
    case 'carro': {
      const portas = bruto.portas;
      if (portas !== 2 && portas !== 4) {
        return falhar('campo "portas" inválido');
      }
      return { placa, tipo: 'carro', portas };
    }
    case 'moto': {
      const cilindradas = bruto.cilindradas;
      if (typeof cilindradas !== 'number') {
        return falhar('campo "cilindradas" inválido');
      }
      return { placa, tipo: 'moto', cilindradas };
    }
    case 'caminhao': {
      const eixos = bruto.eixos;
      if (typeof eixos !== 'number') {
        return falhar('campo "eixos" inválido');
      }
      return { placa, tipo: 'caminhao', eixos };
    }
    default:
      return falhar(`tipo "${String(tipo)}" desconhecido`);
  }
}

// ---------- Dados de teste (chegam da cancela como JSON) ----------
const entradas: [json: string, periodo: Periodo, selo: boolean][] = [
  ['{"placa":"ABC1D23","tipo":"carro","portas":4}', [8, 11], false],
  ['{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', [9, 10], false],
  ['{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', [7, 12], false],
  ['{"placa":"XYZ4E56","tipo":"carro","portas":2}', [14, 16], true],
];

const tickets: Ticket[] = entradas.map(
  ([json, periodo, selo]): Ticket => ({
    veiculo: lerVeiculo(json),
    periodo,
    selo,
    situacao: SituacaoTicket.Aberto,
  })
);

// ---------- Relatório ----------
const fechados: Ticket[] = tickets
  .map(fecharTicket)
  .filter((t) => t.situacao === SituacaoTicket.Pago);

fechados.forEach(registrar);

const faturamento: number = fechados.reduce((acc, t) => acc + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);

const contagem = tickets.reduce(
  (acc, t) => {
    acc[t.veiculo.tipo] += 1;
    return acc;
  },
  { carro: 0, moto: 0, caminhao: 0 }
);
console.log(`Entradas: carro=${contagem.carro}, moto=${contagem.moto}, caminhao=${contagem.caminhao}`);

// ---------- Veículo inválido ----------
try {
  lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(`Erro ao ler veículo: ${erro.message}`);
  }
}
