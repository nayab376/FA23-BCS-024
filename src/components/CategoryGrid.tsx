import { CATEGORY_ICONS } from './Categories';
import { CATEGORY_NAMES } from '../data/seedProducts';

interface CategoryGridProps {
  counts: Record<string, number>;
  onSelect: (name: string) => void;
}

export default function CategoryGrid({ counts, onSelect }: CategoryGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 w-full">
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-lg font-bold text-white">All Categories</h2>
        <span className="text-xs text-gray-500">Click a category to view related products</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {CATEGORY_NAMES.map((name) => {
          const Icon = CATEGORY_ICONS[name];
          const count = counts[name] ?? 0;
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              data-category-tile={name}
              className="group bg-gray-900 border border-gray-800 hover:border-emerald-500/60 rounded-xl p-4 text-left transition-all hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20">
                <Icon className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm font-semibold text-white mb-0.5">{name}</p>
              <p className="text-xs text-gray-500">{count} products</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
