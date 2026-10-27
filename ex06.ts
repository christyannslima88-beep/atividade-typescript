export {};

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  switch (status) {
    case StatusPedido.Recebido:
      return StatusPedido.EmPreparo;
    case StatusPedido.EmPreparo:
      return StatusPedido.SaiuParaEntrega;
    case StatusPedido.SaiuParaEntrega:
      return StatusPedido.Entregue;
    case StatusPedido.Entregue:
    case StatusPedido.Cancelado:
      return status; // etapas finais: não mudam
  }
}

// Mapeamento reverso: número -> nome (StatusPedido[2] === 'EmPreparo')
function exibir(status: StatusPedido): void {
  console.log(`[${status} - ${StatusPedido[status]}] ${mensagem(status)}`);
}

let atual: StatusPedido = StatusPedido.Recebido;
exibir(atual);
while (atual !== StatusPedido.Entregue) {
  atual = avancar(atual);
  exibir(atual);
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// const outro: FormaPagamento = 'PIX'; // Type '"PIX"' is not assignable to type 'FormaPagamento'. (ts2322)
// Por quê? Enum de string é "nominal": só os membros do enum (FormaPagamento.Pix)
// são aceitos, mesmo que o texto seja idêntico ao valor. Isso evita que strings
// soltas e possivelmente erradas (ex.: 'Pix', 'pix') entrem no lugar do enum.
