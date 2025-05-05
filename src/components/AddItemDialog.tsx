import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Coffee, Egg, EggFried, UtensilsCrossed, CupSoda, Cookie } from 'lucide-react';

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
 * Props interface for the AddItemDialog component
 * @property {boolean} open - Whether the dialog is currently open
 * @property {function} onOpenChange - Callback to handle open state changes
 * @property {function} onAddItem - Callback to handle adding a new item
 */
interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (item: Omit<MenuItem, "id">) => void;
}

/**
 * Available icons with their emoji and name
 * Each icon includes:
 * @property {string} emoji - The emoji character for the icon
 * @property {string} name - Identifier for the icon
 * @property {JSX.Element} icon - React component representation of the icon
 */
const iconOptions = [
  { emoji: '☕', name: 'coffee', icon: <Coffee className="h-5 w-5" /> },
  { emoji: '🥚', name: 'egg', icon: <Egg className="h-5 w-5" /> },
  { emoji: '🍳', name: 'egg-fried', icon: <EggFried className="h-5 w-5" /> },
  { emoji: '🍽️', name: 'utensils', icon: <UtensilsCrossed className="h-5 w-5" /> },
  { emoji: '🥤', name: 'cup-soda', icon: <CupSoda className="h-5 w-5" /> },
  { emoji: '🥞', name: 'pancake', icon: <UtensilsCrossed className="h-5 w-5" /> }, 
  { emoji: '🍪', name: 'cookie', icon: <Cookie className="h-5 w-5" /> },
];

/**
 * AddItemDialog Component
 * 
 * Modal dialog for adding new items to the menu.
 * Includes form fields for all necessary item properties.
 * 
 * @param {AddItemDialogProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, onOpenChange, onAddItem }) => {
  // Form state variables
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [iconName, setIconName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🍽️');
  
  /**
   * Handle form submission to add a new item
   * Validates inputs and passes the new item to the parent component
   */
  const handleSubmit = () => {
    // Validate all required fields are present
    if (!name || !price || !category || !iconName) return;
    
    // Parse and validate price
    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) return;
    
    // Call parent callback with the new item data
    onAddItem({
      name,
      price: priceValue,
      category,
      icon: selectedIcon,
      "icon-name": iconName,
    });
    
    // Reset form fields
    setName('');
    setPrice('');
    setCategory('');
    setIconName('');
    setSelectedIcon('🍽️');
    
    // Close the dialog
    onOpenChange(false);
  };
  
  /**
   * Handle icon selection from dropdown
   * Updates both the icon name and emoji representation
   * 
   * @param {string} name - The selected icon name
   */
  const handleIconSelect = (name: string) => {
    setIconName(name);
    const selected = iconOptions.find(option => option.name === name);
    if (selected) {
      setSelectedIcon(selected.emoji);
    }
  };

  /**
   * Handle canceling the add item operation
   * Closes the dialog without saving
   */
  const handleCancel = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg border-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-bold text-center text-brown-DEFAULT">Create a new Item</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pt-4 pb-6 space-y-5">
          {/* Category selection dropdown */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-brown-DEFAULT">Type</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full border-gray-300 rounded-md bg-white/90 focus:ring-gold/50 focus:border-gold">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gold/20">
                <SelectItem value="Drinks" className="cursor-pointer">Drinks</SelectItem>
                <SelectItem value="Pastries" className="cursor-pointer">Pastries</SelectItem>
                <SelectItem value="Mains" className="cursor-pointer">Mains</SelectItem>
                <SelectItem value="Sides" className="cursor-pointer">Sides</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Item name input field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-brown-DEFAULT">Name</Label>
            <Input 
              id="name" 
              placeholder="Item name..." 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="border-gray-300 rounded-md focus:ring-gold/50 focus:border-gold"
            />
          </div>
          
          {/* Item price input field */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium text-brown-DEFAULT">Price</Label>
            <Input 
              id="price" 
              placeholder="0.00" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              step="0.01"
              className="border-gray-300 rounded-md focus:ring-gold/50 focus:border-gold"
            />
          </div>
          
          {/* Icon selection dropdown */}
          <div className="space-y-2">
            <Label htmlFor="icon-name" className="text-sm font-medium text-brown-DEFAULT">Icon</Label>
            <Select value={iconName} onValueChange={handleIconSelect}>
              <SelectTrigger className="w-full border-gray-300 rounded-md bg-white/90 focus:ring-gold/50 focus:border-gold">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto bg-white border border-gold/20">
                {iconOptions.map((option) => (
                  <SelectItem key={option.name} value={option.name} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      {option.emoji} {option.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Form action buttons */}
          <div className="pt-2">
            {/* Save button - disabled if any required field is missing */}
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-gold hover:bg-gold/90 text-white font-medium py-3 rounded-md shadow-sm"
              disabled={!name || !price || !category || !iconName}
            >
              Save
            </Button>
            
            {/* Cancel button */}
            <Button 
              onClick={handleCancel} 
              variant="ghost" 
              className="w-full text-brown-DEFAULT hover:bg-transparent hover:text-brown-light font-medium py-2 mt-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
