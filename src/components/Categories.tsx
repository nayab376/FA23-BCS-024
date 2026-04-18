import {
  Laptop,
  Car,
  Home,
  Sofa,
  Wrench,
  LayoutGrid,
  Smartphone,
  Camera,
  Shirt,
  Dumbbell,
  BookOpen,
} from 'lucide-react';
import { CATEGORY_NAMES } from '../data/seedProducts';

interface Category {
  name: string;
  count: number;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Electronics: Laptop,
  Mobiles: Smartphone,
  Cameras: Camera,
  Vehicles: Car,
  Property: Home,
  'Home & Furniture': Sofa,
  Furniture: Sofa,
  Fashion: Shirt,
  Sports: Dumbbell,
  Books: BookOpen,
  Services: Wrench,
};

export default function Categories({ categories, selectedCategory, onCategoryChange }: CategoriesProps) {
  // Merge the canonical ordered list with any counts we have.
  const countByName = new Map(categories.map((c) => [c.name, c.count]));
  const ordered = CATEGORY_NAMES.map((name) => ({
    name,
    count: countByName.get(name) ?? 0,
  }));

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 w-full">
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
      {ordered.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.name] || LayoutGrid;
        return (
          <button
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            data-category={cat.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.name
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {cat.name}
            {cat.count > 0 && <span className="text-xs opacity-70">({cat.count})</span>}
          </button>
        );
      })}
    </div>
  );
}
