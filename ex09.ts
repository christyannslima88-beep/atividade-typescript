export {};

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// 1) Versão com any (só para ver o problema)
function lerComAny(json: string): string {
  const dados: any = JSON.parse(json);
  return `${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`;
}
// console.log(lerComAny(respostaQuebrada));
// Compila sem nenhum aviso, mas na execução quebra:
// TypeError: dados.temperatura.toFixed is not a function
// (o any desliga a checagem de tipos; o erro só aparece em tempo de execução)

// 3) never: função que nunca retorna normalmente
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// 2) Versão segura com unknown
type Clima = { cidade: string; temperatura: number };

function lerClima(json: string): Clima {
  let bruto: unknown;
  try {
    bruto = JSON.parse(json);
  } catch {
    return falhar('JSON malformado');
  }

  if (typeof bruto !== 'object' || bruto === null) {
    return falhar('resposta não é um objeto');
  }
  if (!('cidade' in bruto) || typeof bruto.cidade !== 'string') {
    return falhar('campo "cidade" inválido');
  }
  const cidade: string = bruto.cidade;

  if (!('temperatura' in bruto) || typeof bruto.temperatura !== 'number') {
    return falhar('campo "temperatura" inválido');
  }
  const temperatura: number = bruto.temperatura;

  return { cidade, temperatura };
}

// 4) e 5) try/catch com catch (erro: unknown)
for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}

void lerComAny;
