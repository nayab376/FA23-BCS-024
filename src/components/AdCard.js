import { useState } from 'react';
import { Heart, Eye, MapPin, Shield, Star, Zap } from 'lucide-react';

export default function AdCard({ ad, onClick }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const formatPrice = (price) => {
    if (price >= 1000000) return `Rs. ${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `Rs. ${(price / 1000).toFixed(0)}K`;
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div
      onClick={() => onClick(ad)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg2)', borderRadius: 'var(--radius)',
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'var(--transition)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow)' : 'none',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: 'var(--bg3)' }}>
        <img
          src={ad.image} alt={ad.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          loading="lazy"
          onError={e => e.target.style.display = 'none'}
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          {ad.featured && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 700 }}>
              <Zap size={10} fill="white" /> FEATURED
            </span>
          )}
          {ad.verified && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, background: 'rgba(34,197,94,0.2)', color: 'var(--green)', fontSize: 11, fontWeight: 700, border: '1px solid rgba(34,197,94,0.3)' }}>
              <Shield size={10} /> VERIFIED
            </span>
          )}
        </div>
        {/* Like */}
        <button
          onClick={e => { e.stopPropagation(); setLiked(!liked); }}
          style={{
            position: 'absolute', top: 10, right: 10, width: 32, height: 32,
            borderRadius: '50%', background: 'rgba(8,9,10,0.7)', backdropFilter: 'blur(8px)',
            display: 'grid', placeItems: 'center', border: '1px solid var(--border)',
            transition: 'var(--transition)',
          }}
        >
          <Heart size={14} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : '#9ca3af'} />
        </button>
        {/* Condition */}
        {ad.condition !== 'N/A' && (
          <span style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 10px', borderRadius: 999, background: 'rgba(8,9,10,0.75)', backdropFilter: 'blur(8px)', fontSize: 11, color: 'var(--text2)', border: '1px solid var(--border)' }}>
            {ad.condition}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4, color: 'var(--text)', flex: 1 }}>
            {ad.title}
          </h3>
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--accent)', marginBottom: 12 }}>
          {formatPrice(ad.price)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          {/* Seller */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #c2410c)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>
              {ad.seller.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{ad.seller.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--gold)' }}>
                <Star size={10} fill="var(--gold)" /> {ad.seller.rating}
              </div>
            </div>
          </div>
          {/* Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text3)' }}>
              <MapPin size={11} /> {ad.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text3)' }}>
              <Eye size={11} /> {ad.views.toLocaleString()} · {ad.postedAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
