let LOJAS = {};
let PRODUTOS = [];
let CUPONS = [];
let TICKER = [];

async function carregarDados() {
  try {
    const res = await fetch('dados.json?v=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const d = await res.json();
    LOJAS = d.lojas || {};
    PRODUTOS = d.produtos || [];
    CUPONS = d.cupons || [];
    TICKER = d.ticker || [];
    return true;
  } catch (err) {
    console.error('Falha ao carregar dados.json:', err);
    document.body.insertAdjacentHTML('afterbegin',
      '<div style="background:#B91C1C;color:#fff;padding:12px 20px;text-align:center;font-size:14px">' +
      '⚠️ Não foi possível carregar os dados do site. Recarregue a página em instantes.</div>');
    return false;
  }
}

function diasParaExpirar(validade) {
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const fim = new Date(validade + 'T23:59:59');
  return Math.ceil((fim - hoje) / (24 * 3600 * 1000));
}

function cuponsValidos() {
  return CUPONS
    .map(c => ({ ...c, expira: diasParaExpirar(c.validade) }))
    .filter(c => c.expira > 0);
}
