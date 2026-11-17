# Lavier Corpo & Mente: site

Site de uma página da Clínica Lavier (estética avançada e terapia integrativa, Salvador, BA), em
React + Vite + Tailwind. O build gera HTML estático: o React roda só na hora do build
(`scripts/prerender.mjs`), e o navegador recebe a página pronta, sem o React no cliente.

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
- `src/index.css`: tokens da paleta no Tailwind (`@theme`), fontes e o CSS próprio da página.
- `public/assets/`: o kit de design (grade, tipografia, botões, menu, movimento). Não edite esses
  arquivos; ajuste a página em `src/index.css`.

## Paleta e tipos

Creme `#F7F1E8` (fundo), oliva `#4A5233` (texto e botões), rosé `#E3A294` (fechamento da página e
detalhes), dourado `#C9A15B` (marca, pontos e setas). Rosé e dourado não são usados como cor de texto
sobre o creme, porque ficam abaixo do contraste mínimo de leitura (4,5:1).
Títulos em Cormorant Garamond, texto em Montserrat, ambos servidos pelo próprio site.

## O que a clínica ainda precisa enviar

1. **Fotos próprias.** As 10 fotos atuais são provisórias, do Unsplash (licença livre), escolhidas só
   para compor o layout. Substitua em `src/content.js` por fotos reais: o espaço, a Larissa atendendo,
   cada tratamento. A seção "O espaço" em especial deve mostrar o espaço de verdade.
2. **Retrato da Larissa** para a seção dela (hoje há uma foto de detalhe no lugar).
3. **Logo em SVG.** O site usa a inicial "L" e o nome em Cormorant enquanto o logo oficial não chega.
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
- "com hora marcada" (seção O espaço e fechamento).

Quando a agenda de dezembro fechar, atualize o aviso em `src/components/Hero.jsx` e o cartão do menu
em `src/components/Nav.jsx`.

Para avaliar o visual final, use `npm run build` e `npm run preview`: no modo dev a página é montada
dentro de `#root`, e a barra fixa do celular só se comporta como na versão publicada no preview.
