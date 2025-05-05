import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Props interface for the MenuHeader component
 * @property {function} onOpenAddItem - Callback function to open the add item dialog
 */
interface MenuHeaderProps {
  onOpenAddItem: () => void;
}

/**
 * MenuHeader Component
 * 
 * Displays the header section of the menu with a title and an add item button.
 * Adapts its appearance based on mobile or desktop viewport.
 * 
 * @param {MenuHeaderProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const MenuHeader: React.FC<MenuHeaderProps> = ({ onOpenAddItem }) => {
  // Determine if the user is on a mobile device to adjust layout
  const isMobile = useIsMobile();
  
  return (
    <div className={`menu-header w-full py-4 px-5 flex justify-between ${isMobile ? 'h-[100px] items-center' : 'h-[140px] items-end'}`}>
      <div>
        {/* Menu title and subtitle */}
        <h1 className="text-white text-2xl font-bold drop-shadow-md">Breakfast Menu</h1>
        <p className="text-white/80 text-sm mt-1">Select your favorite items</p>
      </div>
      
      {/* Add new menu item button */}
      <Button 
        variant="ghost" 
        className="rounded-full h-10 w-10 p-0 bg-white/20 hover:bg-white/30 border border-white/30 shadow-lg"
        onClick={onOpenAddItem}
        aria-label="Add new menu item"
      >
        <Plus className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
};

export default MenuHeader;
