import { useState } from 'react';
import { X, Upload, CheckCircle } from 'lucide-react';
import { categories } from '../data/ads';

export default function PostAdModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', price: '', location: '', condition: 'New', description: '', phone: '' });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = {
    width: '100%', height: 44, padding: '0 14px', borderRadius: 10,
    background: 'var(--bg3)', border: '1px solid var(--border2)',
    color: 'var(--text)', fontSize: 14,
  };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 6, display: 'block' };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => { onClose(); }, 2500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn 0.15s ease' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg2)', borderRadius: 20, border: '1px solid var(--border2)', maxWidth: 520, width: '100%', maxHeight: '90vh', overflow: 'auto', animation: 'fadeUp 0.2s ease', boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}>

        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Post a New Ad</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Step {step} of 2</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg3)', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', color: 'var(--text2)' }}>
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <CheckCircle size={48} color="var(--green)" style={{ margin: '0 auto 16px' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Ad Posted!</div>
            <div style={{ color: 'var(--text3)' }}>Your listing is now live. Closing…</div>
          </div>
        ) : (
          <div style={{ padding: '24px 22px' }}>
            {step === 1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Ad Title *</label>
                  <input style={inputStyle} placeholder="e.g. iPhone 15 Pro Max 256GB" value={form.title} onChange={e => update('title', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select style={{ ...inputStyle }} value={form.category} onChange={e => update('category', e.target.value)}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Price (Rs.) *</label>
                    <input style={inputStyle} placeholder="0" type="number" value={form.price} onChange={e => update('price', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Condition *</label>
                    <select style={inputStyle} value={form.condition} onChange={e => update('condition', e.target.value)}>
                      <option>New</option><option>Like New</option><option>Good</option><option>Fair</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Location *</label>
                  <input style={inputStyle} placeholder="e.g. DHA Phase 6, Lahore" value={form.location} onChange={e => update('location', e.target.value)} />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Description *</label>
                  <textarea style={{ ...inputStyle, height: 100, padding: '10px 14px', resize: 'vertical', lineHeight: 1.6 }} placeholder="Describe your item honestly…" value={form.description} onChange={e => update('description', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input style={inputStyle} placeholder="+92 3XX XXXXXXX" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div style={{ border: '2px dashed var(--border2)', borderRadius: 12, padding: '28px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg3)' }}>
                  <Upload size={24} color="var(--text3)" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 500 }}>Upload Photos</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>Drag & drop or click to browse</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {step === 2 && (
                <button onClick={() => setStep(1)} style={{ flex: 1, height: 44, borderRadius: 10, background: 'var(--bg3)', color: 'var(--text)', fontWeight: 600, border: '1px solid var(--border2)' }}>
                  ← Back
                </button>
              )}
              <button
                onClick={step === 1 ? () => setStep(2) : handleSubmit}
                style={{ flex: 2, height: 44, borderRadius: 10, background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: 15, boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}
              >
                {step === 1 ? 'Continue →' : '🚀 Post Ad'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
