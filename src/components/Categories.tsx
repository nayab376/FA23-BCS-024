import { Laptop, Car, Home, Sofa, Wrench, LayoutGrid } from 'lucide-react';

interface Category {
  name: string;
  count: number;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Electronics: Laptop,
  Vehicles: Car,
  Property: Home,
  Furniture: Sofa,
  Services: Wrench,
};

export default function Categories({ categories, selectedCategory, onCategoryChange }: CategoriesProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
      <button
        onClick={() => onCategoryChange('All')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
          selectedCategory === 'All'
            ? 'bg-emerald-500 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        All
      </button>
      {categories.map((cat) => {
        const Icon = iconMap[cat.name] || LayoutGrid;
        return (
          <button
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.name
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {cat.name}
            <span className="text-xs opacity-70">({cat.count})</span>
          </button>
        );
      })}
    </div>
  );
}
