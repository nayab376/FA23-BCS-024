import { useState } from 'react';
import { X, MapPin, Shield, Star, Eye, Phone, MessageSquare, Heart, Share2, Flag, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdModal({ ad, onClose }) {
  const [liked, setLiked] = useState(false);

  if (!ad) return null;

  const formatPrice = (price) => {
    if (price >= 1000000) return `Rs. ${(price / 1000000).toFixed(2)}M`;
    if (price >= 1000) return `Rs. ${(price / 1000).toFixed(0)}K`;
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn 0.15s ease',
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg2)', borderRadius: 20, border: '1px solid var(--border2)',
          maxWidth: 780, width: '100%', maxHeight: '90vh', overflow: 'auto',
          animation: 'fadeUp 0.2s ease',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>Listing Details</span>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg3)', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', color: 'var(--text2)' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* Image */}
          <div style={{ height: 360, background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
            <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {ad.featured && (
              <span style={{ position: 'absolute', top: 14, left: 14, padding: '4px 12px', borderRadius: 999, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 700 }}>FEATURED</span>
            )}
          </div>

          {/* Details */}
          <div style={{ padding: '24px', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Title & Price */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.3, marginBottom: 10, color: 'var(--text)' }}>{ad.title}</h2>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--accent)' }}>{formatPrice(ad.price)}</div>
            </div>

            {/* Meta chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ad.verified && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999, background: 'rgba(34,197,94,0.1)', color: 'var(--green)', fontSize: 12, fontWeight: 600, border: '1px solid rgba(34,197,94,0.25)' }}>
                  <Shield size={12} /> Verified Seller
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999, background: 'var(--bg3)', color: 'var(--text2)', fontSize: 12, border: '1px solid var(--border)' }}>
                <MapPin size={12} /> {ad.location}
              </span>
              <span style={{ padding: '5px 12px', borderRadius: 999, background: 'var(--bg3)', color: 'var(--text2)', fontSize: 12, border: '1px solid var(--border)' }}>
                {ad.condition !== 'N/A' ? ad.condition : 'N/A'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999, background: 'var(--bg3)', color: 'var(--text2)', fontSize: 12, border: '1px solid var(--border)' }}>
                <Eye size={12} /> {ad.views.toLocaleString()} views
              </span>
            </div>

            {/* Description */}
            <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, background: 'var(--bg3)', borderRadius: 10, padding: '12px 14px' }}>
              {ad.description}
            </div>

            {/* Seller */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg3)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #c2410c)', display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 800, color: 'white', flexShrink: 0 }}>
                {ad.seller.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{ad.seller.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text3)' }}>
                  <Star size={12} fill="var(--gold)" color="var(--gold)" /> {ad.seller.rating} · {ad.seller.deals} deals
                </div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)' }}>{ad.postedAt}</span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, height: 44, borderRadius: 10, background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 0 20px rgba(249,115,22,0.3)', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
              >
                <Phone size={16} /> Call Seller
              </button>
              <button style={{ flex: 1, height: 44, borderRadius: 10, background: 'var(--bg3)', color: 'var(--text)', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1px solid var(--border2)' }}>
                <MessageSquare size={15} /> Chat
              </button>
              <button onClick={() => setLiked(!liked)} style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--bg3)', display: 'grid', placeItems: 'center', border: '1px solid var(--border2)' }}>
                <Heart size={16} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : 'var(--text2)'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
