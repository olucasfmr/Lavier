# Lavier Corpo & Mente: site

Site de uma página da Clínica Lavier (estética avançada e terapia integrativa, Salvador, BA), em
React + Vite + Tailwind. O build gera HTML estático (`scripts/prerender.mjs`): a página chega pronta e
depois o navegador carrega `src/client.jsx`, que liga o movimento de rolagem (GSAP + Lenis, cerca de
51 KB comprimidos) e, logo em seguida, as duas ilhas React (cerca de 131 KB comprimidos): o menu
tubelight e o FAQ.

## Rodar

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173 (edição; o visual final é o do preview)
npm run build     # gera dist/ (HTML estático pronto para publicar)
npm run preview   # serve dist/ em http://localhost:4173
```

Para publicar, envie a pasta `dist/` para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages,
Hostinger etc.).

## Onde está cada coisa

- `src/content.js`: todos os textos dos tratamentos, os links (WhatsApp e Instagram) e as fotos.
- `src/components/`: Nav, Hero, Sections (tratamentos, espaço, avaliação, Larissa) e Footer.
- `src/components/ui/background-gradient-glow.jsx`: o fundo da página (brilhos rosé, champanhe e
  oliva nos cantos da tela, fixos enquanto a página rola). As cores estão no início do arquivo. O
  atalho `@/` aponta para `src/` (`vite.config.js` e `jsconfig.json`).
- `src/lib/motion.js`: todo o movimento da página, ligado à posição da rolagem (por isso a página
  parece um movimento contínuo), com uma só rolagem suave (Lenis). Inspirado nos efeitos 04, 05, 07,
  10 e 16 da coleção naocodei.com/free-code, reescritos com GSAP ScrollTrigger:
  - parallax da faixa "Corpo e mente, em harmonia" (`components/ui/parallax-scrolling.jsx`);
  - um círculo que abre sobre a foto dessa faixa, como o círculo da logo;
  - a citação do manifesto que se preenche palavra por palavra durante a leitura;
  - a linha dourada que desenha as três etapas da avaliação e acende cada marcador;
  - as palavras dos títulos das seções subindo uma a uma ao entrar na tela.
  Com "reduzir movimento" ligado no sistema, ou sem JavaScript, tudo aparece pronto e parado.
- Faixas coloridas (manifesto, Larissa, rodapé) terminam em onda (`public/img/band-mask*.svg`, uma
  máscara CSS) com o fio dourado da logo (`band-edge*.svg`), em vez de cortes retos.
- `src/components/ui/tubelight-navbar.jsx`: os links do menu como pílula, com a luz dourada sobre a
  seção que está na tela (a partir de 1024px; abaixo disso, o botão Menu abre a lista).
- `src/components/ui/text-reveal-faqs.jsx` e `accordion.jsx` (Radix): as perguntas frequentes, com a
  resposta surgindo letra por letra. As perguntas e respostas ficam em `src/content.js` (`faqItems`).
- `src/islands.jsx`: monta as duas ilhas React sobre o HTML pronto.
- `src/components/ui/sticky-footer.jsx`: o rodapé. Em telas a partir de 1024px de largura e 860px de
  altura, o conteúdo fica fixo por baixo da página e é revelado pela rolagem; em telas menores é um
  rodapé comum. As colunas surgem do desfoque quando ele chega (`footerReveal` em `src/lib/motion.js`).
- `src/index.css`: tokens da paleta no Tailwind (`@theme`), fontes e o CSS próprio da página.
- `public/assets/`: o kit de design (grade, tipografia, botões, menu, movimento). Não edite esses
  arquivos; ajuste a página em `src/index.css`.

## Identidade visual

Segue o manual da marca (yin-ebook-59181448.figma.site):

- **Cores:** creme `#F4E9E1` e branco quente `#FBF6F1` (fundos), verde escuro `#4A5233` (texto,
  botões, faixa do manifesto e rodapé), rosé claro `#F5C6B8` (faixa da Larissa e itálicos sobre o
  verde), rosé gold `#E3A294` e dourado `#C9A15B` (linhas, cantos, arco, setas), oliva `#6B7A4B` (no
  brilho do fundo). O itálico dos títulos sobre fundo claro usa `#A86A5C`, um rosé escuro um pouco
  mais fundo que o `#C98778` do manual, porque este fica em 2,6:1 e não é legível.
- **Tipos:** títulos em Cormorant Garamond com a segunda parte em itálico rosé; textos em Montserrat
  Light; rótulos e botões em Montserrat Medium, maiúsculas com espaçamento aberto, com um fio
  dourado. Fontes servidas pelo próprio site.
- **Formas:** cantos retos em fotos, cartões e botões; cantos dourados na foto da abertura e na logo
  do rodapé.
- **Logo:** o original fica em `design/lavier-logo-original.webp` (1234 px, fundo transparente, fora
  do site publicado). O site usa versões leves geradas dele em `public/img/`: `lavier-wordmark.webp`
  (só o nome, no menu, 17 KB), `lavier-logo-224.webp` (logo inteira no rodapé, sobre uma placa creme,
  25 KB) e `lavier-icon-64.png` / `lavier-icon-180.png` (a figura, no ícone da aba e do celular).

## O que a clínica ainda precisa enviar

1. **Fotos próprias.** As 11 fotos atuais são provisórias (uso aprovado em 18/11/2026 até a clínica enviar as dela), do Unsplash (licença livre), escolhidas só
   para compor o layout. Substitua em `src/content.js` por fotos reais: o espaço, a Larissa atendendo,
   cada tratamento. A seção "O espaço" em especial deve mostrar o espaço de verdade.
2. **Retrato da Larissa** para a seção dela (hoje há uma foto de detalhe no lugar).
3. **Logo em SVG** (opcional). O site já usa a logo enviada em WebP; um SVG ou PNG só com o nome
   deixaria o menu mais nítido do que o recorte atual.
4. **Lista real de protocolos**, com nomes e, se quiser, preços. Hoje o site mostra as quatro
   categorias que o Instagram confirma (corporal, facial, terapia integrativa, avaliação).
5. **Endereço** (rua e bairro), se a clínica quiser aparecer no mapa. Sem ele, o site diz só
   "Salvador, BA" e não mostra link de rota.
6. **Domínio**, para ativar a tag `canonical` comentada em `index.html` e trocar `og:image` por um
   endereço completo (`https://domínio/share.jpg`): sem isso a prévia do link no WhatsApp e no Instagram
   não mostra a imagem.
7. **Política de privacidade**, se a clínica passar a coletar dados (hoje não há formulário: o
   agendamento vai direto ao WhatsApp).

## Fatos usados (fonte: Instagram, nov. 2026)

- Nome: Lavier Corpo & Mente, "Estética Avançada & Terapia Integrativa", Salvador, BA.
- Larissa Xavier se apresenta como "Esteticista & Terapeuta" (o site usa esse título, sem "Dra.").
- Agendamento pelo WhatsApp da bio; espaço inaugurado em outubro de 2026; agenda de dezembro aberta.
- A frase da Larissa vem do post dela de 10/10/2026.

## Textos para a clínica confirmar

Estes trechos descrevem o atendimento de forma geral e precisam do aval da Larissa:

- as quatro descrições dos tratamentos em `src/content.js`;
- as três etapas da avaliação (conversa, avaliação do corpo e da pele, plano individual);
- as seis respostas das perguntas frequentes (`faqItems` em `src/content.js`);
- "com hora marcada" (seção O espaço e fechamento).

Para avaliar o visual final, use `npm run build` e `npm run preview`: no modo dev a página é montada
dentro de `#root`, e a barra fixa do celular só se comporta como na versão publicada no preview.
