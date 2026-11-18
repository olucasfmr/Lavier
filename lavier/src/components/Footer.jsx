import { BookButton } from './ui.jsx'

// The page's footer itself is components/ui/sticky-footer.jsx.

// The phone's action bar (system.js shows it once the hero's button has scrolled away).
export function ActionBar() {
  return (
    <nav className="actionbar" aria-label="Ação rápida">
      <BookButton />
    </nav>
  )
}
