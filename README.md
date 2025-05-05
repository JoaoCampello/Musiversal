# 🥞 Breakfast Carousel Delight

A delightful interactive breakfast menu application that allows users to browse through breakfast items in a visually appealing carousel interface, select items, and create new menu offerings.

[Breakfast Carousel Delight]

## 🌟 Features

- **Interactive Menu Display**: Browse breakfast items by category through an engaging carousel interface
- **Category Organization**: Items organized by categories like Drinks, Pastries, Mains, and Sides
- **Order Management**: Add or remove items from your order with visual feedback
- **Order Summary**: Collapsible order summary that shows selected items and total price
- **Add New Items**: Create and add new breakfast items to the menu with custom icons
- **Responsive Design**: Works seamlessly on both mobile and desktop devices

## 🚀 Tech Stack

This project leverages modern web technologies:

- **React**: UI component library for building the interface
- **TypeScript**: Type-safe JavaScript for robust code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality UI components built on Radix UI
- **Vite**: Next-generation frontend build tool
- **Lucide Icons**: Beautiful, consistent icon set

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone
   cd breakfast-carousel-delight
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage Guide

### Browsing Menu Items

- Use the horizontal carousel to browse through different breakfast items by category
- Click the left and right arrows to navigate through items
- Items are organized by categories (Drinks, Pastries, Mains, Sides)

### Adding Items to Your Order

- Click on any breakfast item to add it to your order
- Selected items are highlighted and show a checkmark indicator
- Click again to remove items from your order
- A toast notification confirms when items are added or removed

### Viewing Your Order

- The order summary is always visible at the bottom of the page
- Click on the order summary to expand it and see all selected items
- The total price is automatically calculated and displayed

### Adding New Menu Items

- Click the "+" button in the header to open the Add Item dialog
- Fill in the item details (name, price, category, icon)
- Click "Save" to add the new item to the menu

## 🔧 Configuration

You can customize the menu data by modifying the `menu.json` file in the data folder.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
