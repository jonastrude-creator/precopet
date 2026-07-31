# 🔍 Guia Google Search Console + AdSense — PrecoPet

---

## 📁 Arquivos incluídos nesta versão

```
precopet/
├── index.html        → site principal (com meta tags SEO prontas)
├── style.css         → estilos
├── app.js            → lógica + banner de cookies
├── logo.svg          → logo com pets
├── sitemap.xml       → mapa do site para o Google
├── robots.txt        → instruções para os robôs do Google
├── privacidade.html  → política de privacidade (exigida pelo AdSense)
└── README.md         → este guia
```

---

## PARTE 1 — Google Search Console

O Search Console diz ao Google que o site existe e permite monitorar como ele aparece nas buscas.

### Passo 1 — Cadastrar o site

1. Acesse **search.google.com/search-console**
2. Clique em **"Adicionar propriedade"**
3. Escolha **"Prefixo de URL"**
4. Digite: `https://www.precopet.com.br`
5. Clique em **Continuar**

### Passo 2 — Verificar o domínio

O Google vai te dar um código parecido com:
```
google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz123456
```

1. Abra o `index.html`
2. Encontre esta linha (está no `<head>`):
```html
<meta name="google-site-verification" content="COLE_AQUI_SEU_CODIGO_DO_SEARCH_CONSOLE">
```
3. Substitua `COLE_AQUI_SEU_CODIGO_DO_SEARCH_CONSOLE` pelo código do Google
4. Faça upload do `index.html` atualizado no GitHub
5. Aguarde o Render fazer o deploy (1-2 min)
6. Volte ao Search Console e clique em **"Verificar"**

### Passo 3 — Enviar o Sitemap

Após a verificação:
1. No menu esquerdo do Search Console, clique em **"Sitemaps"**
2. No campo "Adicionar um novo sitemap", digite: `sitemap.xml`
3. Clique em **"Enviar"**
4. O Google vai rastrear o site nas próximas 24-72h

### O que o Search Console faz por você
- Mostra quais palavras-chave trazem visitantes
- Alerta sobre erros no site
- Mostra quantas páginas o Google indexou
- Essencial para crescer no SEO

---

## PARTE 2 — Google AdSense

O AdSense exibe anúncios no seu site e você ganha dinheiro por cliques/visualizações.

> ⚠️ **Atenção:** O AdSense só aprova sites com conteúdo suficiente.
> Antes de se cadastrar, tenha pelo menos:
> - Site funcionando com domínio próprio (precopet.com.br)
> - Política de Privacidade publicada ✅ (já incluída)
> - Conteúdo real (produtos, cupons, calculadora) ✅ (já incluído)

### Passo 1 — Criar conta no AdSense

1. Acesse **adsense.google.com**
2. Clique em **"Começar agora"**
3. Insira o URL do site: `https://www.precopet.com.br`
4. Informe seu e-mail e país
5. Aceite os termos e continue

### Passo 2 — Obter o Publisher ID

Após criar a conta, você receberá um código como:
```
ca-pub-1234567890123456
```
Esse é o seu **Publisher ID**.

### Passo 3 — Adicionar o código no site

1. Abra o `index.html`
2. Encontre este bloco comentado no `<head>`:
```html
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> -->
```
3. Remova os `<!--` e `-->` para descomentar
4. Substitua `ca-pub-XXXXXXXXXXXXXXXX` pelo seu Publisher ID real:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossorigin="anonymous"></script>
```
5. Faça upload no GitHub → Render atualiza automaticamente

### Passo 4 — Aguardar aprovação

O Google vai analisar o site (geralmente 1-14 dias). Você receberá um e-mail de aprovação ou pedido de ajustes.

### Passo 5 — Criar unidades de anúncio

Após aprovação, no painel do AdSense:
1. Vá em **Anúncios → Por unidade de anúncio**
2. Crie os tipos recomendados para comparadores de preço:

| Tipo | Onde colocar no site | Tamanho recomendado |
|------|---------------------|---------------------|
| Display responsivo | Entre seções da home | Responsivo |
| Dentro do artigo | Página de detalhe do produto | Responsivo |
| Âncora | Rodapé fixo mobile | Automático |

### Passo 6 — Adicionar anúncio no site

O AdSense gera um código assim:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

Cole esse código no `index.html` onde quiser exibir o anúncio. Sugestões:
- Entre "Ofertas da semana" e "Mais comparados" na home
- Abaixo da tabela de preços na página de detalhe
- Acima do rodapé

---

## PARTE 3 — Google Analytics (recomendado)

Mostra dados detalhados de visitantes: de onde vêm, o que clicam, quanto tempo ficam.

### Configurar

1. Acesse **analytics.google.com**
2. Clique em **"Criar propriedade"**
3. Nome: `PrecoPet`, fuso: `Brasil`, moeda: `BRL`
4. Escolha **"Web"**, insira `https://www.precopet.com.br`
5. Copie o código de rastreamento (começa com `GT-` ou `G-`)
6. No `index.html`, encontre o bloco comentado do Analytics e ative substituindo o ID

---

## PARTE 4 — Verificação final

Após configurar tudo, verifique:

```
☐ Search Console verificado
☐ Sitemap enviado no Search Console
☐ robots.txt acessível em precopet.com.br/robots.txt
☐ Política de privacidade acessível em precopet.com.br/privacidade.html
☐ Código do AdSense no <head> do index.html
☐ Banner de cookies aparecendo para novos visitantes ✅ (já implementado)
☐ Link para privacidade no rodapé ✅ (já implementado)
```

---

## Quanto tempo leva para ganhar dinheiro com AdSense?

| Fase | Tempo estimado | O que fazer |
|------|----------------|-------------|
| Aprovação | 1–14 dias | Aguardar e-mail do Google |
| Primeiros cliques | 1–4 semanas após aprovação | Trazer tráfego via SEO e redes sociais |
| R$100/mês | 3–6 meses | Com 5.000–10.000 visitas/mês |
| R$500+/mês | 6–12 meses | Com 30.000+ visitas/mês |

O AdSense sozinho não é a principal fonte de renda — os links de afiliado rendem mais. Use o AdSense como renda complementar para visitantes que não clicam nos produtos.

---

## Resumo rápido

```
Hoje
├── 1. Subir site no GitHub + Render ← você já fez
├── 2. Conectar domínio precopet.com.br ← você já fez
├── 3. Cadastrar no Search Console → verificar domínio
└── 4. Enviar sitemap no Search Console

Semana 1
├── 5. Cadastrar no AdSense
└── 6. Aguardar aprovação (pode levar até 14 dias)

Quando aprovado
├── 7. Adicionar código do AdSense no index.html
└── 8. Criar unidades de anúncio no painel
```
