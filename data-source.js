/* ══════════════════════════════════════════════════════════
   PRECOPET — data-source.js
   ══════════════════════════════════════════════════════════
   TODOS os dados do site vivem no arquivo dados.json.
   Para atualizar preços, produtos, cupons ou o ticker:
   → edite APENAS o dados.json (pode ser direto no GitHub,
     até pelo celular) e o Render publica sozinho em ~2 min.
   → você NUNCA precisa mexer neste arquivo nem no app.js.

   FUTURO (automação total): um robô (GitHub Actions) pode
   ler o feed da Lomadee/Amazon e reescrever o dados.json
   sozinho — o site continua funcionando sem nenhuma mudança.
   ══════════════════════════════════════════════════════════ */

let LOJAS = {};
let PRODUTOS = [];
let CUPONS = [];
let TICKER = [];
let DADOS_ATUALIZADO_EM = null;

/* Gera histórico de preços ilustrativo para o gráfico.
   Se um produto tiver o campo "hist" no dados.json (lista de
   preços passados), ele é usado; senão criamos uma tendência
   simples a partir do menor preço atual. */
function gerarHist(precos, lojaBase, dias) {
  const hist = []; const hoje = new Date();
  for (let i = dias - 1; i >= 0; i--) {
    const d = new Date(hoje); d.setDate(d.getDate() - i);
    const idx = Math.min(Math.floor((dias - 1 - i) / (dias / precos.length)), precos.length - 1);
    hist.push({ data: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), preco: +(precos[idx] + (Math.random() - .5) * 4).toFixed(2) });
  }
  return hist;
}

/* Carrega dados.json e preenche as variáveis globais.
   Chamado uma única vez, no início do app.js. */
async function carregarDados() {
  try {
    const res = await fetch('dados.json?v=' + Date.now()); // ?v= evita cache velho
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const d = await res.json();

    LOJAS = d.lojas || {};
    CUPONS = d.cupons || [];
    TICKER = d.ticker || [];
    DADOS_ATUALIZADO_EM = d.atualizadoEm || null;

    PRODUTOS = (d.produtos || []).map(p => {
      const menorP = Math.min(...p.precos.map(x => x.preco));
      const base = (p.hist && p.hist.length) ? p.hist
        : [+(menorP * 1.15).toFixed(2), +(menorP * 1.08).toFixed(2), menorP];
      return { ...p, historico: gerarHist(base, null, 30) };
    });
    return true;
  } catch (err) {
    console.error('Falha ao carregar dados.json:', err);
    document.body.insertAdjacentHTML('afterbegin',
      '<div style="background:#B91C1C;color:#fff;padding:12px 20px;text-align:center;font-size:14px">' +
      '⚠️ Não foi possível carregar os dados do site. Recarregue a página em instantes.</div>');
    return false;
  }
}

/* ══════════════════════════════════════════════════════════
   HELPERS DE CUPONS — expiração automática
   ══════════════════════════════════════════════════════════ */
function diasParaExpirar(validade) {
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const fim = new Date(validade + 'T23:59:59');
  return Math.ceil((fim - hoje) / (24 * 3600 * 1000));
}

/* Só cupons ainda válidos; vencidos somem sozinhos do site. */
function cuponsValidos() {
  return CUPONS
    .map(c => ({ ...c, expira: diasParaExpirar(c.validade) }))
    .filter(c => c.expira > 0);
}

/* ══════════════════════════════════════════════════════════
   CAMADA DataSource — troque por fetch() de API real no futuro
   ══════════════════════════════════════════════════════════ */
const DataSource = {
  async getProdutos() { return PRODUTOS; },
  async getCupons() { return cuponsValidos(); },
  async getLojas() { return LOJAS; },
  async getTicker() { return TICKER; },
  getUltimaAtualizacao() { return DADOS_ATUALIZADO_EM; }
};
