export {};

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return; // return antecipado (vazio)
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((d) => enviar(d, mensagem));
}

const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], 'x'.repeat(200), porSms); // longa demais
notificarTodos(['(69) 99999-0000'], aviso, porSms);

// function teste(): void { return 10; } // Type 'number' is not assignable to type 'void'. (ts2322)

// Reflexão: este notificador retorna número e é aceito.
const contar: Notificador = (d, m) => m.length;
// Quando o TIPO DE FUNÇÃO declara retorno `void`, o TypeScript significa
// "o chamador não vai usar o valor retornado", e não "a função não pode retornar
// nada". Assim, qualquer função pode ser usada onde se espera um callback void
// (ex.: forEach ignora o retorno). Já em uma função declarada com
// `function teste(): void`, o retorno de um valor é checado e dá erro.
void contar;
