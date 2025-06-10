import React, { useState } from 'react';
import { auth, database, ref, push, set } from '../firebase';

const SendFriendRequest = () => {
  const [friendEmail, setFriendEmail] = useState('');

  const sendRequest = async () => {
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in");

    const requestRef = ref(database, 'friendRequests');
    const newRequestRef = push(requestRef);

    await set(newRequestRef, {
      from: user.uid,
      toEmail: friendEmail,
      timestamp: Date.now()
    });

    setFriendEmail('');
    alert('Request sent!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Send Friend Request</h2>
      <input
        type="email"
        placeholder="Friend's Email"
        value={friendEmail}
        onChange={(e) => setFriendEmail(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={sendRequest} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
};

export default SendFriendRequest;
