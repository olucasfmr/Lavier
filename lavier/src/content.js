// Fatos e textos do site. Fonte: Instagram @laviercorpoemente e @larissaxavier.rrles (nov. 2026).
// Nada aqui é inventado além do que o perfil diz; o que a clínica ainda precisa enviar está em LEIA-ME.md.

const phone = '5571981538910' // o link wa.me da bio do Instagram
const message = 'Olá! Quero agendar uma avaliação na Lavier.'

export const links = {
  whatsapp: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
  instagram: 'https://www.instagram.com/laviercorpoemente/',
}

export const MAIN_ACTION = 'Agendar avaliação'

// Fotografias de apoio (Unsplash) até a clínica enviar as suas. Cada uma é um stand-in.
const unsplash = (id) => (w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&auto=format&q=72`

export const photos = {
  hero: { src: unsplash('1591343395082-e120087004b4'), w: 1256, h: 1432, alt: 'Mulher deitada de bruços na maca recebe massagem nas costas, em preto e branco' },
  corporal: { src: unsplash('1600334129128-685c5582fd35'), w: 1256, h: 1100, alt: 'Pedras quentes alinhadas sobre as costas de uma cliente, com orquídeas brancas na maca' },
  facial: { src: unsplash('1570172619644-dfd03ed5d881'), w: 1256, h: 1100, alt: 'Esteticista aplica máscara facial com pincel em uma cliente de olhos fechados' },
  integrativa: { src: unsplash('1617897903246-719242758050'), w: 1256, h: 1100, alt: 'Frasco de óleo com conta-gotas sobre uma tábua de madeira, com ramos de eucalipto' },
  avaliacao: { src: unsplash('1552693673-1bf958298935'), w: 1256, h: 1100, alt: 'Profissional de luvas examina a pele do rosto de uma cliente deitada' },
  develop: { src: unsplash('1519824145371-296894a0daa9'), w: 1256, h: 1120, alt: 'Mãos da terapeuta pressionam o ombro de uma cliente deitada' },
  toalhas: { src: unsplash('1540555700478-4be289fbecef'), w: 1256, h: 1000, alt: 'Toalha dobrada, frasco de creme, vela acesa e tulipas cor-de-rosa sobre a bancada' },
  ritual: { src: unsplash('1590439471364-192aa70c0b53'), w: 1256, h: 1000, alt: 'Toalha enrolada, escova de corpo, sabonete e sal em pratos de cerâmica clara' },
  oleo: { src: unsplash('1515377905703-c4788e51af15'), w: 1000, h: 1250, alt: 'Gotas de óleo caem de um frasco âmbar na palma da mão' },
  menu: { src: unsplash('1600428877878-1a0fd85beda8'), w: 640, h: 320, alt: 'Sérum em frasco âmbar, rolo de quartzo rosa e pedra gua sha sobre fundo claro' },
}

export const treatments = [
  {
    key: 'corporal',
    name: 'Estética corporal',
    line: 'Protocolos para o corpo e a pele, definidos depois da avaliação individual.',
    tag: 'Corpo',
    menu: 'Protocolos para o corpo',
  },
  {
    key: 'facial',
    name: 'Estética facial',
    line: 'Cuidado da pele do rosto com a limpeza, os ativos e o ritmo que ela pede.',
    tag: 'Rosto',
    menu: 'Pele do rosto',
  },
  {
    key: 'integrativa',
    name: 'Terapia integrativa',
    line: 'Sessões que tratam corpo e mente juntos, para a autoestima acompanhar o resultado.',
    tag: 'Corpo e mente',
    menu: 'Corpo e mente juntos',
  },
  {
    key: 'avaliacao',
    name: 'Avaliação individual',
    line: 'A primeira consulta: seus objetivos, seu histórico e o plano feito para o seu caso.',
    tag: 'Primeiro passo',
    menu: 'Onde tudo começa',
  },
]

export const evaluationSteps = [
  { name: 'Conversa', line: 'O que você quer mudar, sua rotina e o que já tentou antes.' },
  { name: 'Avaliação do corpo e da pele', line: 'Corpo e pele avaliados para definir o que faz sentido no seu caso.' },
  { name: 'Plano individual', line: 'Um protocolo com as sessões indicadas para o seu caso.' },
]
