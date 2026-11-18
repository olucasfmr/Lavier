// The page's background: soft glows in the corners of the screen (after the "Aurora Dream Corner
// Whispers" gradient), in the Lavier palette: rosé claro, champagne gold, rosé gold and a trace of
// oliva over the warm white and creme of the brand manual. Text stays above 4.5:1 on its brightest point.
//
// It paints body::before, fixed to the screen, so the glows stay in the corners while the page
// scrolls, with no seams between sections, and the page keeps its shell (header, main of sections,
// footer). Render it once, as a sibling of <main>.
const glow = [
  'radial-gradient(ellipse 85% 65% at 8% 8%, rgba(245, 198, 184, 0.42), transparent 60%)',
  'radial-gradient(ellipse 75% 60% at 75% 35%, rgba(232, 208, 160, 0.34), transparent 62%)',
  'radial-gradient(ellipse 70% 60% at 15% 80%, rgba(227, 162, 148, 0.22), transparent 62%)',
  'radial-gradient(ellipse 70% 60% at 92% 92%, rgba(107, 122, 75, 0.10), transparent 62%)',
  'linear-gradient(180deg, #fbf6f1 0%, #f4e9e1 100%)',
].join(', ')

const css = `body::before { content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none; background: ${glow}; }`

export function BackgroundGradientGlow() {
  return <style>{css}</style>
}
