import React, { useState } from 'react';
import { ShoppingBag, ChevronUp, ChevronDown } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

/**
 * Interface defining the structure of a menu item
 * @property {number} id - Unique identifier for the menu item
 * @property {string} name - Display name of the menu item
 * @property {number} price - Price of the menu item
 * @property {string} category - Category the item belongs to (e.g., "Drinks", "Mains")
 * @property {string} icon - Emoji representation of the item
 * @property {string} icon-name - Name identifier for the icon
 * @property {string} [image] - Optional URL to an image of the item
 */
interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  icon: string;
  "icon-name": string;
  image?: string;
}

/**
 * Props interface for the OrderSummary component
 * @property {MenuItem[]} selectedItems - Array of items selected by the user
 */
interface OrderSummaryProps {
  selectedItems: MenuItem[];  // Array of items selected by the user
}

/**
 * OrderSummary Component
 * 
 * Displays a collapsible summary of the user's current order,
 * including total price, item count, and individual items.
 * 
 * @param {OrderSummaryProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedItems }) => {
  // State to track if the order summary is expanded or collapsed
  const [isOpen, setIsOpen] = useState(false);
  
  // Calculate the total price by summing the prices of all selected items
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
  
  // Get the total number of items in the order
  const itemCount = selectedItems.length;
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className={cn(
        "sticky bottom-0 left-0 right-0 bg-cream py-4 px-5 border-t-2 border-gold shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]",
        "transition-all duration-300 z-10",
        // Apply deeper shadow when the collapsible is open for visual emphasis
        isOpen && "shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
      )}
    >
      {/* Header section with order summary and total price */}
      <div className="flex justify-between items-center">
        <CollapsibleTrigger className="group flex items-center gap-2 focus:outline-none" asChild>
          <div className="flex items-center cursor-pointer">
            <h2 className="text-brown-DEFAULT text-lg font-bold flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Your Order
              {/* Display item count badge when there are items in the order */}
              {itemCount > 0 && (
                <span className="bg-gold rounded-full text-white text-xs w-5 h-5 inline-flex items-center justify-center ml-1">
                  {itemCount}
                </span>
              )}
            </h2>
            {/* Toggle icon that changes based on expanded/collapsed state */}
            <div className="ml-2 text-gold">
              {isOpen ? (
                <ChevronDown className="h-5 w-5 transition-transform group-hover:scale-110" />
              ) : (
                <ChevronUp className="h-5 w-5 transition-transform group-hover:scale-110" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        {/* Total price display */}
        <div className="text-brown-DEFAULT text-xl font-bold bg-cream py-2 px-4 rounded-full shadow-sm border border-gold/30">
          ${totalPrice.toFixed(2)}
        </div>
      </div>
      
      {/* Additional information about the order state */}
      <p className="text-brown-light text-xs mt-1 mb-2">
        {itemCount === 0 
          ? "Your order is empty" 
          : `${itemCount} item${itemCount !== 1 ? 's' : ''} selected`
        }
      </p>
      
      {/* Collapsible content that shows detailed list of ordered items */}
      <CollapsibleContent className="mt-3 overflow-hidden animate-accordion-down">
        {selectedItems.length === 0 ? (
          // Display message when no items have been added
          <div className="text-center py-3 text-brown-light italic">
            No items in your order yet
          </div>
        ) : (
          // Scrollable container for order items with max height
          <div className="max-h-[40vh] overflow-y-auto pr-1">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gold/10 last:border-0">
                <div className="flex items-center gap-2">
                  {/* Item emoji/icon */}
                  <span className="text-xl">{item.icon}</span>
                  {/* Item name */}
                  <span className="font-medium text-brown-DEFAULT">{item.name}</span>
                </div>
                {/* Item price */}
                <span className="font-medium text-brown-DEFAULT">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OrderSummary;
