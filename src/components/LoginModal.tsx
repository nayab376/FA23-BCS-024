import { useState } from 'react';
import { X, User, Store, ShieldCheck, Crown, LogIn } from 'lucide-react';
import { useAuth, type UserRole, ROLE_LABEL } from '../context/AuthContext';

interface LoginModalProps {
  onClose: () => void;
  message?: string | null;
}

const ROLE_OPTIONS: {
  role: UserRole;
  icon: typeof User;
  description: string;
  color: string;
}[] = [
  {
    role: 'buyer',
    icon: User,
    description: 'Browse products, save favorites, contact sellers.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    role: 'seller',
    icon: Store,
    description: 'Post ads, manage listings, connect with buyers.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    role: 'admin',
    icon: ShieldCheck,
    description: 'Moderate ads and manage reported listings.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    role: 'super',
    icon: Crown,
    description: 'Full access — users, categories and site settings.',
    color: 'from-fuchsia-500 to-purple-600',
  },
];

export default function LoginModal({ onClose, message }: LoginModalProps) {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    const finalEmail = email.trim() || `${selectedRole}@adflow.pk`;
    const finalName =
      name.trim() ||
      `Demo ${ROLE_LABEL[selectedRole]}`;
    login({ email: finalEmail, name: finalName, role: selectedRole });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-white">Login to AdFlow Pro</h2>
            {message && (
              <p className="text-xs text-amber-400 mt-1">{message}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <p className="text-sm text-gray-400 mb-3">Choose how you want to sign in:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLE_OPTIONS.map(({ role, icon: Icon, description, color }) => {
                const active = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    data-role={role}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      active
                        ? 'border-emerald-400 bg-gray-800 ring-2 ring-emerald-500/40'
                        : 'border-gray-700 bg-gray-800/60 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-semibold text-white">
                        Login as {ROLE_LABEL[role]}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!selectedRole}
              data-testid="login-submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              <LogIn className="w-4 h-4" />
              {selectedRole
                ? `Continue as ${ROLE_LABEL[selectedRole]}`
                : 'Select a role to continue'}
            </button>
            <p className="text-[11px] text-gray-500 text-center">
              Demo login — no password required. Your role is saved locally.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
