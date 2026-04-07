import { TrendingUp, Tag, MapPin, Star } from 'lucide-react';

interface Stats {
  total_ads: number;
  total_categories: number;
  total_locations: number;
  featured_ads: number;
}

interface HeroProps {
  stats: Stats | null;
}

export default function Hero({ stats }: HeroProps) {
  const statItems = [
    { icon: Tag, label: 'Total Ads', value: stats?.total_ads ?? 0, color: 'text-emerald-400' },
    { icon: TrendingUp, label: 'Categories', value: stats?.total_categories ?? 0, color: 'text-blue-400' },
    { icon: MapPin, label: 'Locations', value: stats?.total_locations ?? 0, color: 'text-purple-400' },
    { icon: Star, label: 'Featured', value: stats?.featured_ads ?? 0, color: 'text-amber-400' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Find the Best Deals on <span className="text-emerald-400">AdFlow Pro</span>
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          Your premium classifieds marketplace — buy, sell, and discover amazing deals.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="bg-gray-800/60 backdrop-blur border border-gray-700/50 rounded-xl p-4 flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg bg-gray-700/50 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
