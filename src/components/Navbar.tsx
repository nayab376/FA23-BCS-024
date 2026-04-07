import { Search, Plus, TrendingUp } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostAdClick: () => void;
}

export default function Navbar({ searchQuery, onSearchChange, onPostAdClick }: NavbarProps) {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <TrendingUp className="w-7 h-7 text-emerald-400" />
          <span className="text-xl font-bold text-white">
            AdFlow <span className="text-emerald-400">Pro</span>
          </span>
        </div>

        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search ads by title, description, or location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={onPostAdClick}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Post Ad
        </button>
      </div>
    </nav>
  );
}
