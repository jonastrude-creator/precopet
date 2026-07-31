# PrecoPet — Comparador de preços pet

Site: **precopet.com.br**
Hospedagem: **Cloudflare Pages** (gratuito, bandwidth ilimitado)

---

## Deploy no Cloudflare Pages (passo a passo)

### 1. Suba os arquivos no GitHub

Se ainda não tem repositório:

```
1. Acesse github.com → "New repository"
2. Nome: precopet
3. Público ou Privado (os dois funcionam)
4. Clique "Create repository"
5. Faça upload dos arquivos do ZIP (botão "uploading an existing file")
   → Todos os arquivos devem ficar na RAIZ do repositório
   → Não coloque dentro de uma pasta "precopet/"
6. Clique "Commit changes"
```

Estrutura correta do repositório:
```
precopet/          (repositório)
├── index.html     ← na raiz
├── style.css
├── app.js
├── data-source.js
├── dados.json
├── favicon.png
├── icon-192.png
├── icon-512.png
├── og-image.png
├── logo.svg
├── ads.txt
├── robots.txt
├── sitemap.xml
├── privacidade.html
├── termos.html
├── 404.html
├── ATUALIZAR.md
├── GUIA_GOOGLE.md
└── README.md
```

### 2. Crie conta no Cloudflare

```
1. Acesse: pages.cloudflare.com
2. Clique "Sign up" → crie conta gratuita (e-mail + senha)
3. Não precisa adicionar cartão de crédito
```

### 3. Conecte o repositório

```
1. No painel do Cloudflare → "Workers & Pages" (menu lateral)
2. Clique "Create" → aba "Pages" → "Connect to Git"
3. Autorize o Cloudflare a acessar seu GitHub
4. Selecione o repositório "precopet"
5. Configurações de build:
   ├── Framework preset: None
   ├── Build command: (deixe VAZIO)
   └── Build output directory: / (barra, indicando a raiz)
6. Clique "Save and Deploy"
7. Aguarde ~1 minuto → site no ar em: precopet.pages.dev
```

### 4. Conecte o domínio precopet.com.br

```
1. No painel do projeto → aba "Custom domains"
2. Clique "Set up a custom domain"
3. Digite: precopet.com.br
4. O Cloudflare vai pedir que você aponte o DNS:
   ├── Tipo: CNAME
   ├── Nome: @ (ou precopet.com.br)
   └── Destino: precopet.pages.dev
5. Acesse registro.br → painel do domínio → DNS
6. Adicione o registro CNAME conforme indicado
   (ou transfira o DNS para o Cloudflare — ele oferece essa opção
    e é mais rápido/confiável que o DNS do registro.br)
7. Aguarde propagação (5 min a 24h)
8. SSL (HTTPS) é ativado automaticamente pelo Cloudflare
```

**Dica:** Se o registro.br não aceitar CNAME na raiz (@), use o DNS do próprio Cloudflare:
```
1. No painel Cloudflare → "Websites" → "Add a site"
2. Digite: precopet.com.br
3. Escolha plano Free
4. O Cloudflare mostra 2 nameservers (ex: anna.ns.cloudflare.com)
5. No registro.br → altere os nameservers para os do Cloudflare
6. Pronto — DNS + CDN + SSL tudo no Cloudflare gratuitamente
```

### 5. Teste

Acesse `precopet.com.br` e verifique:
- [ ] Home carrega com produtos e cupons
- [ ] Busca funciona
- [ ] Clicar em produto abre modal com preços
- [ ] Cupons aparecem com botão copiar
- [ ] Modo escuro funciona
- [ ] Testar no celular (responsivo)
- [ ] precopet.com.br/#divulgacao abre o gerador de posts
- [ ] /privacidade.html e /termos.html abrem
- [ ] /404.html aparece para URLs inexistentes

---

## Como atualizar o site

Edite o arquivo `dados.json` direto no GitHub:

```
1. Acesse seu repositório no github.com
2. Clique no arquivo "dados.json"
3. Clique no ícone de lápis (Edit)
4. Faça a alteração (preço, produto, cupom, ticker)
5. Clique "Commit changes"
6. Cloudflare detecta o commit e publica em ~1 minuto
```

Guia completo de como editar cada campo: veja o arquivo `ATUALIZAR.md`

---

## Configurações do Google (após o site estar no ar)

### Google Search Console
```
1. Acesse: search.google.com/search-console
2. Adicione: https://www.precopet.com.br
3. Copie o código de verificação
4. Cole no index.html (meta tag google-site-verification)
5. Commit no GitHub → Cloudflare publica
6. Volte ao Search Console → "Verificar"
7. Envie o sitemap: sitemap.xml
```

### Google AdSense
```
1. Acesse: adsense.google.com
2. Cadastre: https://www.precopet.com.br
3. Quando aprovado:
   ├── Descomentar o script no <head> do index.html
   ├── Substituir ca-pub-XXXXXXXXXXXXXXXX pelo seu ID
   └── Editar ads.txt com seu Publisher ID
4. Commit no GitHub → anúncios começam a aparecer
```

### Google Analytics (opcional)
```
1. Acesse: analytics.google.com
2. Crie propriedade para precopet.com.br
3. Copie o Measurement ID (GT-XXXXXXXX)
4. Descomentar o script no index.html
5. Substituir GT-XXXXXXXX pelo seu ID
```

Guia detalhado: veja o arquivo `GUIA_GOOGLE.md`

---

## Estrutura técnica

```
dados.json          ← SEUS DADOS (único arquivo que você edita)
  ↓ carregado por
data-source.js      ← camada de dados (pronta para API futura)
  ↓ consumido por
app.js              ← lógica de interface
  ↓ renderiza
index.html + style.css ← estrutura e visual
```

Quando as APIs de afiliado estiverem disponíveis (Lomadee, Amazon),
a mudança acontece apenas no data-source.js — o resto não muda.

---

## Vantagens do Cloudflare Pages

- Bandwidth ilimitado (sem limite de tráfego no plano gratuito)
- CDN global com 300+ pontos (incluindo Brasil)
- SSL automático e gratuito
- Deploy automático a cada commit no GitHub
- DNS gratuito (se usar nameservers do Cloudflare)
- Proteção contra DDoS inclusa
- Sem necessidade de cartão de crédito
- Build em ~30 segundos (site estático, sem framework)
