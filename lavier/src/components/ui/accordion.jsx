import { forwardRef } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils.js'

// shadcn/ui accordion (Radix), in plain JSX. The look lives in index.css (.accordion*), in the Lavier
// palette (the chevron is drawn by CSS on the trigger); the open and close height animation is the
// accordion-down / accordion-up keyframes there.
export const Accordion = AccordionPrimitive.Root

export const AccordionItem = forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('accordion__item', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="accordion__header">
    <AccordionPrimitive.Trigger ref={ref} className={cn('accordion__trigger', className)} {...props}>
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="accordion__content overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('accordion__body', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName
