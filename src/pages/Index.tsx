import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import MenuHeader from '@/components/MenuHeader';
import MenuCategoryView from '@/components/MenuCategoryView';
import MenuCarousel from '@/components/MenuCarousel';
import OrderSummary from '@/components/OrderSummary';
import AddItemDialog from '@/components/AddItemDialog';
import { useIsMobile } from '@/hooks/use-mobile';

// Import menu data from JSON file
import menuData from '@/data/menu.json';

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
 * Main Index/Home page component
 * 
 * This is the primary page of the application that manages the menu display,
 * user selections, and handles adding new items to the menu.
 * 
 * @returns {JSX.Element} - Rendered component
 */
const Index = () => {
  // State for storing the full menu data
  const [menu, setMenu] = useState<MenuItem[]>([]);
  
  // State for tracking items the user has selected
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  
  // State for storing unique menu categories
  const [categories, setCategories] = useState<string[]>([]);
  
  // State for controlling the visibility of the add item dialog
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  
  // Hook to determine if the user is on a mobile device
  const isMobile = useIsMobile();
  
  /**
   * Initialize data when component mounts
   * 
   * Loads menu data from the JSON file and extracts unique categories
   */
  useEffect(() => {
    // Load menu data from imported JSON
    setMenu(menuData as MenuItem[]);
    
    // Extract unique categories from menu items
    const uniqueCategories = Array.from(
      new Set((menuData as MenuItem[]).map(item => item.category))
    );
    setCategories(uniqueCategories);
  }, []);
  
  /**
   * Handles adding or removing an item from the user's order
   * 
   * If the item is already in the order, it will be removed.
   * Otherwise, it will be added to the order.
   * 
   * @param {MenuItem} item - The menu item to add or remove
   */
  const handleOrderItem = (item: MenuItem) => {
    setSelectedItems(currentItems => {
      // Check if item is already in the order
      const isAlreadySelected = currentItems.some(
        selectedItem => selectedItem.id === item.id
      );
      
      // If already selected, remove it; otherwise add it
      if (isAlreadySelected) {
        toast(`Removed ${item.name} from your order`, {
          className: "bg-cream border-gold text-brown-DEFAULT",
          position: "bottom-center"
        });
        return currentItems.filter(selectedItem => selectedItem.id !== item.id);
      } else {
        toast(`Added ${item.name} to your order`, {
          className: "bg-cream border-gold text-brown-DEFAULT",
          position: "bottom-center"
        });
        return [...currentItems, item];
      }
    });
  };
  
  /**
   * Handles adding a new menu item to the menu
   * 
   * Creates a new item with a unique ID and adds it to the menu data
   * 
   * @param {Omit<MenuItem, "id">} newItem - The new menu item without an ID
   */
  const handleAddMenuItem = (newItem: Omit<MenuItem, "id">) => {
    // Generate a new unique ID for the item
    const newId = Math.max(...menu.map(item => item.id), 0) + 1;
    const itemWithId = { id: newId, ...newItem };
    
    // Add the new item to the menu
    setMenu(currentMenu => [...currentMenu, itemWithId]);
    
    // Add the category if it's new
    if (!categories.includes(newItem.category)) {
      setCategories(currentCategories => [...currentCategories, newItem.category]);
    }
    
    // Show success notification
    toast.success(`Added ${newItem.name} to the menu`, {
      className: "bg-cream border-gold text-brown-DEFAULT",
      position: "bottom-center"
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header component with add item button */}
      <MenuHeader onOpenAddItem={() => setAddItemDialogOpen(true)} />
      
      {/* Main content area with menu items */}
      <div className="flex-grow overflow-y-auto pb-32">
        {categories.map(category => (
          <React.Fragment key={category}>
            {/* Render different view based on device type */}
            {isMobile ? (
              <MenuCategoryView 
                items={menu} 
                category={category} 
                onOrderItem={handleOrderItem}
                selectedItems={selectedItems}
              />
            ) : (
              <MenuCarousel 
                items={menu} 
                category={category} 
                onOrderItem={handleOrderItem}
                selectedItems={selectedItems}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Order summary component (sticky at bottom) */}
      <OrderSummary selectedItems={selectedItems} />
      
      {/* Dialog for adding new menu items */}
      <AddItemDialog
        open={addItemDialogOpen}
        onOpenChange={setAddItemDialogOpen}
        onAddItem={handleAddMenuItem}
      />
    </div>
  );
};

export default Index;
