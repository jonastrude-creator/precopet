# 🔄 COMO ATUALIZAR O PRECOPET — Guia do dia a dia

A partir de agora, **todo o conteúdo do site vive em um único arquivo: `dados.json`**.
Você nunca mais precisa mexer em código (HTML/CSS/JS) para atualizar preços, produtos, cupons ou o ticker.

```
Você edita dados.json no GitHub  →  Render publica sozinho (~2 min)  →  site atualizado
```

---

## Como editar (até pelo celular)

1. Acesse seu repositório no **github.com**
2. Clique no arquivo **`dados.json`**
3. Clique no ícone de **lápis ✏️** (Edit)
4. Faça a alteração
5. Clique em **"Commit changes"**
6. Pronto — o Render detecta e publica em ~2 minutos

---

## O que dá para atualizar no dados.json

### 📅 Data de verificação dos preços (sempre atualize!)
```json
"atualizadoEm": "2026-07-01"
```
Essa data aparece no site como "Preços verificados em 01/07/2026". Sempre que revisar os preços, mude para o dia atual — isso é transparência com o usuário e proteção jurídica para você.

### 💰 Mudar o preço de um produto
Localize o produto e altere o número:
```json
{ "loja": "petz", "preco": 289.90, ... }
           mude aqui ↑
```

### ➕ Adicionar um produto novo
Copie um bloco de produto existente, cole no final da lista `"produtos"` e altere:
```json
{
  "id": 13,
  "cat": "racao",
  "marca": "Nova Marca",
  "nome": "Nome do Produto Novo",
  "img": "https://url-da-imagem.jpg",
  "rating": 4.5,
  "reviews": 120,
  "badge": "new",
  "badgeLabel": "Novo",
  "desc": "Descrição do produto.",
  "specs": [["Peso","10kg"],["Para","Adulto"]],
  "fretegratis": true,
  "precos": [
    { "loja":"petz",   "preco":99.90, "de":119.90, "frete":"Grátis", "prazo":"1-2 dias", "parcelas":"4x R$24,98", "estoque":true },
    { "loja":"amazon", "preco":94.90, "de":null,   "frete":"Grátis", "prazo":"1 dia",    "parcelas":"4x R$23,73", "estoque":true }
  ]
}
```
⚠️ Regras: `id` único (não repita), `cat` deve ser uma de: `racao, saude, acessorios, higiene, brinquedos, gatos`. Lojas válidas: `petz, cobasi, petlove, amazon, shopee, magalu, petshop`.

### 🏷️ Adicionar/renovar cupom
```json
{ "id": 12, "loja": "Shopee", "off": "15% OFF", "desc": "Em rações acima de R$50",
  "codigo": "SHOPRACAO15", "validade": "2026-08-15", "cat": "racao" }
```
✅ **Cupom vencido some do site sozinho** — o site calcula a validade automaticamente. Você só precisa adicionar novos ou estender a data dos renovados.

### 📢 Mudar o ticker (faixa verde que rola no topo)
```json
"ticker": [
  "🔥 Sua mensagem de oferta aqui",
  "🏷️ Outra mensagem"
]
```

### 🔗 Trocar link direto por link de afiliado (quando aprovado!)
```json
"petz": { "nome":"Petz", "cor":"#6B3FA0", "url":"https://www.petz.com.br", ... }
                                    troque esta URL pelo seu link de afiliado ↑
```

---

## ⚠️ Cuidado — JSON é sensível a vírgulas

- Todo item de lista termina com vírgula, **exceto o último**
- Textos sempre entre aspas duplas `"assim"`
- Antes de salvar, valide em **jsonlint.com** (cola o conteúdo, clica em Validate)
- Se o JSON quebrar, o site mostra um aviso vermelho no topo — basta corrigir o erro e salvar de novo

---

## 🤖 Automação futura (quando aprovar na Lomadee)

O passo seguinte é um robô gratuito (GitHub Actions) que roda todo dia às 6h:

```
GitHub Actions (agendado)
   → baixa feed de cupons/preços da Lomadee
   → reescreve dados.json
   → commit automático
   → Render publica
   → site atualizado sem você tocar em nada
```

O site já está 100% preparado para isso — o robô só precisa gerar o mesmo formato de `dados.json`. Quando você tiver as credenciais da Lomadee, peça o script que eu crio.

---

## ✅ Checklist Google (AdSense + Search Console)

Já preparado no site:
- [x] Meta tag de verificação do Search Console (`index.html`, linha ~19 — cole seu código)
- [x] `sitemap.xml` — envie no Search Console após verificar
- [x] `robots.txt` — permite indexação e aponta o sitemap
- [x] `ads.txt` — **edite com seu Publisher ID** quando o AdSense aprovar
- [x] Script AdSense comentado no `<head>` — descomente e cole seu `ca-pub-...`
- [x] Espaços de anúncio (`ad-slot`) na home e na página de produto
- [x] Política de Privacidade + Termos de Uso + banner de cookies (exigências de aprovação)

Ordem: 1º site no ar com domínio → 2º Search Console (verificar + sitemap) → 3º AdSense (cadastrar e aguardar 1–14 dias) → 4º ativar código + ads.txt.
