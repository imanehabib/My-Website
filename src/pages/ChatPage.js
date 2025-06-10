import React, { useEffect, useState, useRef } from 'react';
import { auth, database, ref, push, onValue } from '../firebase';

const ChatPage = ({ friendId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const user = auth.currentUser;
  const conversationId = user && friendId
    ? [user.uid, friendId].sort().join('_')
    : null;

  useEffect(() => {
    if (!conversationId) return;

    const messagesRef = ref(database, `messages/${conversationId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const msgs = [];

      for (let key in data) {
        msgs.push({ id: key, ...data[key] });
      }

      msgs.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;

    const messagesRef = ref(database, `messages/${conversationId}`);
    await push(messagesRef, {
      sender: user.uid,
      text: newMessage,
      timestamp: Date.now()
    });

    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!user) return <p>Please log in to chat.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat with Friend</h2>
      <div className="border h-96 overflow-y-auto p-2 mb-2 bg-gray-100 rounded">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${
              msg.sender === user.uid ? 'bg-blue-200 text-right' : 'bg-green-200 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="flex-1 border rounded p-2 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
