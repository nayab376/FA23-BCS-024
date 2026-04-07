import { MapPin, Star, Phone } from 'lucide-react';

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  image_url: string | null;
  contact: string | null;
  created_at: string;
  featured: boolean;
}

interface AdCardProps {
  ad: Ad;
  onClick: (ad: Ad) => void;
}

function formatPrice(price: number): string {
  if (price >= 10000000) return `Rs. ${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `Rs. ${(price / 100000).toFixed(1)} Lac`;
  return `Rs. ${price.toLocaleString()}`;
}

export default function AdCard({ ad, onClick }: AdCardProps) {
  return (
    <div
      onClick={() => onClick(ad)}
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all cursor-pointer group"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-800">
        {ad.image_url ? (
          <img
            src={ad.image_url}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        {ad.featured && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-amber-500/90 text-white text-xs font-medium rounded-md">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-emerald-400 text-xs font-medium rounded-md">
          {ad.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-1 truncate group-hover:text-emerald-400 transition-colors">
          {ad.title}
        </h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{ad.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-emerald-400 font-bold text-lg">{formatPrice(ad.price)}</span>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <MapPin className="w-3 h-3" />
            {ad.location}
          </div>
        </div>

        {ad.contact && (
          <div className="mt-2 flex items-center gap-1 text-gray-500 text-xs">
            <Phone className="w-3 h-3" />
            {ad.contact}
          </div>
        )}
      </div>
    </div>
  );
}
