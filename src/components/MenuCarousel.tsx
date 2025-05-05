import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
 * Props interface for the MenuCarousel component
 * @property {MenuItem[]} items - All menu items to display
 * @property {string} category - The category to filter and display
 * @property {function} onOrderItem - Callback function when an item is selected
 * @property {MenuItem[]} selectedItems - Currently selected items
 */
interface MenuCarouselProps {
  items: MenuItem[];
  category: string;
  onOrderItem: (item: MenuItem) => void;
  selectedItems: MenuItem[];
}

/**
 * MenuCarousel Component
 * 
 * Displays a horizontal scrollable carousel of menu items for a specific category.
 * Includes navigation buttons and visual indicators for selected items.
 * 
 * @param {MenuCarouselProps} props - Component props
 * @returns {JSX.Element | null} - Rendered component or null if no items
 */
const MenuCarousel: React.FC<MenuCarouselProps> = ({ 
  items, 
  category, 
  onOrderItem,
  selectedItems 
}) => {
  // State to track which items are currently visible in the carousel
  const [activeIndex, setActiveIndex] = useState(0);
  // Reference to the carousel container for potential DOM manipulation
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter items by category
  const categoryItems = items.filter(item => item.category === category);
  
  // Calculate the number of visible items based on the number of items
  // Limit to 5 items visible at once, or fewer if there aren't enough items
  const visibleItems = Math.min(5, categoryItems.length);
  // Calculate the maximum index we can scroll to
  const maxIndex = Math.max(0, categoryItems.length - visibleItems);
  
  /**
   * Navigate to the previous set of items in the carousel
   */
  const goToPrevious = () => {
    setActiveIndex((prevIndex) => 
      Math.max(0, prevIndex - 1)
    );
  };

  /**
   * Navigate to the next set of items in the carousel
   */
  const goToNext = () => {
    setActiveIndex((prevIndex) => 
      Math.min(maxIndex, prevIndex + 1)
    );
  };
  
  /**
   * Check if an item is currently selected in the order
   * @param {MenuItem} item - The item to check
   * @returns {boolean} - True if the item is selected
   */
  const isItemSelected = (item: MenuItem) => {
    return selectedItems.some(selectedItem => selectedItem.id === item.id);
  };

  // If no items in this category, show an empty state message
  if (categoryItems.length === 0) {
    return (
      <div className="my-8">
        <h2 className="text-brown-DEFAULT text-xl font-semibold mb-4 px-5 border-b border-gold/20 pb-2">{category}</h2>
        <div className="flex justify-center items-center h-32 bg-cream/30 rounded-xl mx-5">
          <p className="text-brown-light italic">No items in this category</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="my-8">
      {/* Category heading and navigation controls */}
      <div className="flex justify-between items-center px-5 mb-4">
        <h2 className="text-brown-DEFAULT text-xl font-semibold border-b border-gold/20 pb-2">{category}</h2>
        
        {/* Previous/Next navigation buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white border-gold/30 shadow-md h-8 w-8"
            onClick={goToPrevious}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className={`h-4 w-4 ${activeIndex === 0 ? 'text-gray-300' : 'text-gold'}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full bg-white border-gold/30 shadow-md h-8 w-8"
            onClick={goToNext}
            disabled={activeIndex >= maxIndex}
          >
            <ChevronRight className={`h-4 w-4 ${activeIndex >= maxIndex ? 'text-gray-300' : 'text-gold'}`} />
          </Button>
        </div>
      </div>
      
      {/* Carousel container with sliding animation */}
      <div 
        className="flex justify-center items-center py-4 overflow-hidden" 
        ref={carouselRef} 
      >
        <div className="flex items-center justify-center w-full relative">
          {/* Scrollable items container with horizontal sliding animation */}
          <div className="flex transition-transform duration-300 gap-4 px-12" 
            style={{ transform: `translateX(-${activeIndex * 88}px)` }}>
            {/* Render each menu item card */}
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
                onClick={() => onOrderItem(item)}
              >
                <div 
                  className={cn(
                    "w-24 h-32 rounded-xl flex flex-col items-center justify-center border-2 relative shadow-sm",
                    // Apply different styles based on whether the item is selected
                    isItemSelected(item) 
                      ? "bg-cream border-gold shadow-md" 
                      : "bg-white border-gold/30 hover:border-gold"
                  )}
                >
                  {/* Item icon */}
                  <div className="text-3xl mb-2">{item.icon}</div>
                  {/* Item name */}
                  <div className="text-sm text-gold font-medium text-center px-1 mb-1">{item.name}</div>
                  {/* Item price */}
                  <div className="text-xs text-brown-light/70">${item.price.toFixed(2)}</div>
                  
                  {/* Display checkmark for selected items */}
                  {isItemSelected(item) && (
                    <div className="absolute top-2 right-2 bg-gold rounded-full w-5 h-5 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCarousel;
