import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Collapsible component
 * 
 * Root component that contains the collapsible content.
 * Manages the open/closed state of the collapsible region.
 * 
 * Based on Radix UI's Collapsible primitive.
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * CollapsibleTrigger component
 * 
 * The button that toggles the collapsible content.
 * When clicked, it toggles the open/closed state.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * CollapsibleContent component
 * 
 * The content that will be shown or hidden based on the collapsible state.
 * Provides smooth animations when opening and closing.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
