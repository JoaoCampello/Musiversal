import React from 'react';
import { Check } from 'lucide-react';
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
 * Props interface for the MenuCategoryView component
 * @property {MenuItem[]} items - All menu items to display
 * @property {string} category - The category to filter and display
 * @property {function} onOrderItem - Callback function when an item is selected
 * @property {MenuItem[]} selectedItems - Currently selected items
 */
interface MenuCategoryViewProps {
  items: MenuItem[];
  category: string;
  onOrderItem: (item: MenuItem) => void;
  selectedItems: MenuItem[];
}

/**
 * MenuCategoryView Component
 * 
 * Displays a grid of menu items for a specific category.
 * Each item can be selected/deselected by clicking on it.
 * 
 * @param {MenuCategoryViewProps} props - Component props
 * @returns {JSX.Element | null} - Rendered component or null if no items in category
 */
const MenuCategoryView: React.FC<MenuCategoryViewProps> = ({ 
  items, 
  category, 
  onOrderItem,
  selectedItems 
}) => {
  // Filter items by category
  const categoryItems = items.filter(item => item.category === category);
  
  /**
   * Check if an item is currently selected in the order
   * @param {MenuItem} item - The item to check
   * @returns {boolean} - True if the item is selected
   */
  const isItemSelected = (item: MenuItem) => {
    return selectedItems.some(selectedItem => selectedItem.id === item.id);
  };

  // If no items in this category, don't render anything
  if (categoryItems.length === 0) {
    return null;
  }
  
  return (
    <div className="px-5 py-6 bg-white">
      {/* Category heading */}
      <h2 className="text-brown-DEFAULT text-xl font-semibold mb-4 border-b border-gold/20 pb-2">{category}</h2>
      
      {/* Grid of menu items */}
      <div className="flex flex-wrap justify-center gap-3">
        {categoryItems.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onOrderItem(item)}
          >
            <div
              className={cn(
                "flex items-center gap-2 py-2 px-4 rounded-full border-2 shadow-sm transition-all",
                // Apply different styles based on whether the item is selected
                isItemSelected(item) 
                  ? "bg-cream border-gold shadow-md" 
                  : "bg-white border-gold/40 hover:border-gold"
              )}
            >
              {/* Item icon */}
              <div className="text-xl">{item.icon}</div>
              {/* Item name */}
              <div className="text-gold font-medium">{item.name}</div>
              {/* Item price */}
              <div className="text-brown-light/70 text-xs ml-1">${item.price.toFixed(2)}</div>
              
              {/* Display checkmark for selected items */}
              {isItemSelected(item) && (
                <div className="bg-gold rounded-full w-4 h-4 flex items-center justify-center ml-1">
                  <Check className="h-2 w-2 text-white stroke-[3]" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryView;
