import React, { useState } from 'react';
import { auth, db, doc, setDoc } from '../firebase';

const SendFriendRequest = () => {
  const [receiverUid, setReceiverUid] = useState('');

  const sendRequest = async () => {
    const senderUid = auth.currentUser.uid;
    const requestRef = doc(db, 'friendRequests', `${senderUid}_${receiverUid}`);

    await setDoc(requestRef, {
      from: senderUid,
      to: receiverUid,
      status: 'pending',
      createdAt: new Date(),
    });

    alert("تم إرسال طلب الصداقة");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="UID الصديق"
        value={receiverUid}
        onChange={(e) => setReceiverUid(e.target.value)}
      />
      <button onClick={sendRequest}>إرسال طلب صداقة</button>
    </div>
  );
};

export default SendFriendRequest;
