// Joins class names, skipping empty ones (the shadcn `cn` helper, without tailwind-merge: the
// components here never pass two conflicting utilities for the same property).
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
