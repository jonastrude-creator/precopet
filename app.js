'use strict';
/* ══════════════════════════════════════════════════
   PRECOPET — app.js (vitrine de links)
   Foco: produto → escolher loja → comprar
   Zero manutenção de preços
   ══════════════════════════════════════════════════ */

/* ═══ SAFE localStorage ═══ */
function lsGet(k,fb){try{return localStorage.getItem(k)??fb}catch{return fb}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch{}}

/* ═══ HELPERS ═══ */
function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function toast(m){document.querySelectorAll('.toast').forEach(t=>t.remove());const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),3000)}

/* ═══ INIT ═══ */
let catFiltro='todos';
document.addEventListener('DOMContentLoaded',async()=>{
  const ok=await carregarDados();
  if(!ok) return;
  renderCats();
  renderProdutos();
  renderCupons();
  initTheme();
  initCookieBanner();
  if(location.hash==='#divulgacao') abrirDivulgacao();
  if(location.hash==='#cupons') document.getElementById('sec-cupons')?.scrollIntoView({behavior:'smooth'});
  window.addEventListener('scroll',()=>{document.getElementById('back-top').classList.toggle('show',scrollY>500)},{passive:true});
});

/* ═══ CATEGORIAS ═══ */
function renderCats(){
  const cats=['todos',...new Set(PRODUTOS.map(p=>p.cat))];
  const labels={todos:'Todos',racao:'Ração',saude:'Saúde',acessorios:'Acessórios',higiene:'Higiene',brinquedos:'Brinquedos',gatos:'Gatos'};
  document.getElementById('cats').innerHTML=cats.map(c=>
    `<button class="cat-btn${c===catFiltro?' active':''}" onclick="filtrarCat('${c}')">${labels[c]||c}</button>`
  ).join('');
}
function filtrarCat(cat){
  catFiltro=cat;renderCats();renderProdutos();
  document.getElementById('sec-produtos')?.scrollIntoView({behavior:'smooth'});
}

/* ═══ BUSCA ═══ */
function filtrar(){renderProdutos()}

/* ═══ PRODUTOS (cards com botões de loja) ═══ */
function renderProdutos(){
  const busca=(document.getElementById('busca')?.value||'').toLowerCase();
  let lista=PRODUTOS;
  if(catFiltro!=='todos') lista=lista.filter(p=>p.cat===catFiltro);
  if(busca.length>1) lista=lista.filter(p=>(p.nome+' '+p.marca).toLowerCase().includes(busca));

  document.getElementById('prod-count').textContent=lista.length+' produto(s)';
  const grid=document.getElementById('grid');

  if(!lista.length){grid.innerHTML='<div class="empty">Nenhum produto encontrado.</div>';return}

  grid.innerHTML=lista.map(p=>{
    // Gera botões só para lojas que têm link
    const botoes=Object.entries(p.links||{})
      .filter(([_,url])=>url&&url.trim())
      .map(([loja,url])=>{
        const l=LOJAS[loja];
        if(!l) return '';
        return `<a class="btn-loja" href="${esc(url)}" target="_blank" rel="sponsored noopener" style="--loja-cor:${l.cor}">${esc(l.nome)} →</a>`;
      }).join('');

    const nLojas=Object.values(p.links||{}).filter(u=>u&&u.trim()).length;

    return `
    <div class="card">
      <div class="card-img">
        <img src="${p.img}" alt="${esc(p.nome)}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-marca">${esc(p.marca)}</div>
        <div class="card-nome">${esc(p.nome)}</div>
        <div class="card-desc">${esc(p.desc)}</div>
        <div class="card-lojas-label">Ver preço em ${nLojas} loja${nLojas>1?'s':''}:</div>
        <div class="card-btns">${botoes}</div>
      </div>
    </div>`;
  }).join('');
}

/* ═══ CUPONS ═══ */
function renderCupons(){
  const cv=cuponsValidos();
  const el=document.getElementById('cupons-grid');
  if(!cv.length){el.innerHTML='<div class="empty">Nenhum cupom ativo no momento.</div>';return}
  el.innerHTML=cv.map(c=>`
    <div class="cupom">
      <div class="cupom-loja">${esc(c.loja)}</div>
      <div class="cupom-off">${esc(c.off)}</div>
      <div class="cupom-desc">${esc(c.desc)}</div>
      <div class="cupom-code-row">
        <span class="cupom-code">${esc(c.codigo)}</span>
        <button class="cupom-copy" onclick="copiarCupom('${esc(c.codigo)}')">Copiar</button>
      </div>
      <div class="cupom-footer">
        <span class="cupom-validade${c.expira<=7?' exp':''}">📅 ${new Date(c.validade).toLocaleDateString('pt-BR')} (${c.expira}d)</span>
        <button class="cupom-whats" onclick="shareWhats('${esc(c.loja)}','${esc(c.off)}','${esc(c.codigo)}')">📲 WhatsApp</button>
      </div>
    </div>`).join('');
}
function copiarCupom(code){navigator.clipboard.writeText(code).then(()=>toast('Código copiado: '+code))}
function shareWhats(loja,off,code){
  const msg=`🏷️ Cupom ${loja}: ${off}\nCódigo: ${code}\n\nMais cupons: https://www.precopet.com.br/#cupons`;
  window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');
}

/* ═══ TEMA ═══ */
function initTheme(){
  const saved=lsGet('pp_theme',null);
  const dark=saved?saved==='dark':(window.matchMedia?.('(prefers-color-scheme:dark)').matches);
  document.body.dataset.theme=dark?'dark':'light';
  document.getElementById('theme-btn').textContent=dark?'☀️':'🌙';
}
function toggleTheme(){
  const isDark=document.body.dataset.theme==='dark';
  document.body.dataset.theme=isDark?'light':'dark';
  document.getElementById('theme-btn').textContent=isDark?'🌙':'☀️';
  lsSet('pp_theme',isDark?'light':'dark');
}

/* ═══ COOKIE BANNER ═══ */
function initCookieBanner(){
  if(lsGet('pp_cookies',null)) return;
  document.getElementById('cookie-banner').innerHTML=`<div class="cookie-bar">
    <span style="flex:1">Usamos cookies para melhorar sua experiência. <a href="/privacidade.html" style="color:var(--verde)">Saiba mais</a></span>
    <button class="accept" onclick="lsSet('pp_cookies','1');this.closest('.cookie-bar').remove()">Aceitar</button>
    <button class="reject" onclick="lsSet('pp_cookies','0');this.closest('.cookie-bar').remove()">Recusar</button>
  </div>`;
}

/* ═══ RASTREAMENTO (anônimo) ═══ */
document.addEventListener('click',e=>{
  const link=e.target.closest('a[rel~="sponsored"]');
  if(!link) return;
  const card=link.closest('.card');
  const produto=card?.querySelector('.card-nome')?.textContent||'desconhecido';
  const loja=link.textContent.replace('→','').trim();
  if(typeof gtag==='function') gtag('event','clique_afiliado',{produto:produto.slice(0,80),loja});
});

/* ═══════════════════════════════════════════════════
   GERADOR DE POSTS — /#divulgacao (senha: pet2026)
   ═══════════════════════════════════════════════════ */
const SENHA_DIVULGACAO='pet2026';
let divulgacaoLiberada=false;

function abrirDivulgacao(){
  if(!divulgacaoLiberada){
    const senha=prompt('🔒 Área restrita. Digite a senha:');
    if(senha!==SENHA_DIVULGACAO){toast('Senha incorreta');history.replaceState(null,'',location.pathname);return}
    divulgacaoLiberada=true;
  }
  document.getElementById('page-divulgacao').classList.add('open');
  const sp=document.getElementById('div-produto');
  if(sp&&!sp.dataset.ok){
    sp.innerHTML=PRODUTOS.map(p=>`<option value="${p.id}">${esc(p.marca)} — ${esc(p.nome.slice(0,35))}</option>`).join('');
    sp.dataset.ok='1';
  }
  const sc=document.getElementById('div-cupom');
  if(sc&&!sc.dataset.ok){
    const cv=cuponsValidos();
    sc.innerHTML=cv.map(c=>`<option value="${c.id}">${esc(c.loja)} — ${esc(c.off)}</option>`).join('');
    sc.dataset.ok='1';
  }
  gerarPost();
}
function fecharDivulgacao(){document.getElementById('page-divulgacao').classList.remove('open');history.replaceState(null,'',location.pathname)}

function gerarPost(){
  const tipo=document.getElementById('div-tipo').value;
  const tom=document.getElementById('div-tom').value;
  document.getElementById('div-campo-produto').style.display=tipo==='cupom'?'none':'';
  document.getElementById('div-campo-cupom').style.display=tipo==='cupom'?'':'none';

  let texto='',link='https://www.precopet.com.br/';

  if(tipo==='produto'||tipo==='oferta'){
    const id=+document.getElementById('div-produto').value;
    const p=PRODUTOS.find(x=>x.id===id);
    if(!p){document.getElementById('post-texto').textContent='Sem produtos.';return}
    const lojaLinks=Object.entries(p.links||{}).filter(([_,u])=>u&&u.trim());
    const lojaTexto=lojaLinks.map(([k])=>LOJAS[k]?.nome).filter(Boolean).join(', ');
    link='https://www.precopet.com.br/';

    if(tipo==='oferta'){
      const ab={direto:`💰 ${p.marca} ${p.nome} — compare e economize!`,emocionante:`🚨 ACHADO! Compare antes de comprar 👇`,informativo:`${p.nome} disponível em ${lojaLinks.length} lojas. Vale comparar.`};
      texto=`${ab[tom]}\n\n📦 ${p.marca} — ${p.nome}\n🏪 Disponível em: ${lojaTexto}\n\n🔗 Compare: link na bio\n#precopet #pet #ofertapet #economia`;
    } else {
      const ab={direto:`🐾 ${p.marca} — ${p.nome}`,emocionante:`Seu pet vai amar! 🐶🐱`,informativo:`${p.marca} ${p.nome} — veja onde comprar.`};
      texto=`${ab[tom]}\n\n📦 ${p.desc}\n🏪 Compare em: ${lojaTexto}\n\n🔗 Veja as opções: link na bio\n#precopet #pet #${p.cat}`;
    }
  }

  if(tipo==='cupom'){
    const id=+document.getElementById('div-cupom').value;
    const c=cuponsValidos().find(x=>x.id===id);
    if(!c){document.getElementById('post-texto').textContent='Sem cupons.';return}
    link='https://www.precopet.com.br/#cupons';
    const ab={direto:`🏷️ CUPOM ${c.loja}: ${c.off}`,emocionante:`🚨 CORRE! Válido até ${new Date(c.validade).toLocaleDateString('pt-BR')} 🚨`,informativo:`Cupom disponível na ${c.loja}.`};
    texto=`${ab[tom]}\n\n📝 ${c.desc}\n🔑 Código: ${c.codigo}\n📅 Até ${new Date(c.validade).toLocaleDateString('pt-BR')}\n\n🔗 Mais cupons: link na bio\n#precopet #cupom #desconto #pet`;
  }

  if(tipo==='ranking'){
    link='https://www.precopet.com.br/';
    const top3=PRODUTOS.slice(0,3);
    const linhas=top3.map((p,i)=>{
      const lojas=Object.entries(p.links||{}).filter(([_,u])=>u&&u.trim()).map(([k])=>LOJAS[k]?.nome).filter(Boolean).join(', ');
      return `${'🥇🥈🥉'[i]} ${p.marca} — ${p.nome} (em: ${lojas})`;
    }).join('\n');
    const ab={direto:'🏆 TOP 3 produtos pet da semana:',emocionante:'😱 Esses 3 você PRECISA comparar:',informativo:'Destaques da semana em produtos pet:'};
    texto=`${ab[tom]}\n\n${linhas}\n\n🔗 Compare todos: link na bio\n#precopet #ranking #pet`;
  }

  document.getElementById('post-texto').textContent=texto;
  document.getElementById('post-link-url').value=link;
}

function copiarPost(){
  navigator.clipboard.writeText(document.getElementById('post-texto').textContent).then(()=>toast('Texto copiado! Cole no Instagram/Facebook'));
}
function copiarLink(){
  navigator.clipboard.writeText(document.getElementById('post-link-url').value).then(()=>toast('Link copiado!'));
}

/* ═══ HASH ROUTING ═══ */
window.addEventListener('hashchange',()=>{
  const h=location.hash.replace('#','');
  if(h==='divulgacao') abrirDivulgacao();
  else if(h==='cupons') document.getElementById('sec-cupons')?.scrollIntoView({behavior:'smooth'});
});
