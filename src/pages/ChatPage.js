import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchChatMessages, sendChatMessage } from '../api';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { chatId } = useParams();
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const loadMessages = useCallback(async () => {
    const res = await fetchChatMessages(token, chatId);
    setMessages(res.messages);
  }, [token, chatId]);

  useEffect(() => {
    loadMessages().catch((err) => setError(err.message));
  }, [loadMessages]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await sendChatMessage(token, chatId, text.trim());
      setMessages(res.messages);
      setText('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container" style={{ padding: '34px 24px 48px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 14 }}>Chat Room</h1>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: 14, minHeight: 340, maxHeight: 500, overflowY: 'auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.sender_id === user.id ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
              <div style={{ maxWidth: '75%', padding: '8px 12px', borderRadius: 10, background: m.sender_id === user.id ? 'var(--accent)' : 'var(--bg3)', color: 'white' }}>
                {m.message}
              </div>
            </div>
          ))}
          {!messages.length && <div style={{ color: 'var(--text3)' }}>No messages yet.</div>}
        </div>
        <form onSubmit={onSend} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." style={{ flex: 1, height: 42, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <button type="submit" style={{ height: 42, padding: '0 18px', borderRadius: 10, background: 'var(--accent)', color: 'white', fontWeight: 700 }}>Send</button>
        </form>
        {error && <div style={{ color: 'var(--red)', marginTop: 10 }}>{error}</div>}
      </div>
      <Footer />
    </div>
  );
}
