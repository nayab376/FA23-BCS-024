import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              AdFlow <span className="text-emerald-400">Pro</span>
            </span>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AdFlow Pro. Built by Nayab Zaman.
          </p>
        </div>
      </div>
    </footer>
  );
}
