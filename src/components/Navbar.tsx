import { Search, Plus, TrendingUp, LogIn, LogOut, User, Store, ShieldCheck, Crown } from 'lucide-react';
import { useAuth, ROLE_LABEL, type UserRole } from '../context/AuthContext';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostAdClick: () => void;
  onLoginClick: () => void;
  onLogoClick: () => void;
}

const ROLE_ICON: Record<UserRole, typeof User> = {
  buyer: User,
  seller: Store,
  admin: ShieldCheck,
  super: Crown,
};

export default function Navbar({
  searchQuery,
  onSearchChange,
  onPostAdClick,
  onLoginClick,
  onLogoClick,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const RoleIcon = user ? ROLE_ICON[user.role] : User;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity"
        >
          <TrendingUp className="w-7 h-7 text-emerald-400" />
          <span className="text-xl font-bold text-white">
            AdFlow <span className="text-emerald-400">Pro</span>
          </span>
        </button>

        <div className="flex-1 min-w-[200px] max-w-xl relative order-3 md:order-2 basis-full md:basis-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by title, description, or location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 order-2 md:order-3">
          <button
            onClick={onPostAdClick}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Post Ad</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg">
                <RoleIcon className="w-4 h-4 text-emerald-400" />
                <div className="hidden md:flex flex-col leading-tight">
                  <span className="text-xs font-medium text-white truncate max-w-[120px]">{user.name}</span>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wide">{ROLE_LABEL[user.role]}</span>
                </div>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
