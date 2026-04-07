import { X, MapPin, Phone, Star, Tag, Calendar } from 'lucide-react';

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

interface AdModalProps {
  ad: Ad;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString()}`;
}

export default function AdModal({ ad, onClose }: AdModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {ad.image_url && (
            <img src={ad.image_url} alt={ad.title} className="w-full h-64 object-cover rounded-t-2xl" />
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-gray-900/80 rounded-full text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {ad.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-lg">
              <Star className="w-4 h-4" />
              Featured
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-white">{ad.title}</h2>
            <span className="text-2xl font-bold text-emerald-400 shrink-0">{formatPrice(ad.price)}</span>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">{ad.description}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800 rounded-lg p-3">
              <Tag className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">{ad.category}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800 rounded-lg p-3">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span className="text-sm">{ad.location}</span>
            </div>
            {ad.contact && (
              <div className="flex items-center gap-2 text-gray-400 bg-gray-800 rounded-lg p-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{ad.contact}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800 rounded-lg p-3">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-sm">{new Date(ad.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {ad.contact && (
            <a
              href={`tel:${ad.contact}`}
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contact Seller
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
