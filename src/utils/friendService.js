import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

export async function sendFriendRequest(currentUserId, targetUserId) {
  const currentUserRef = doc(db, 'users', currentUserId);
  const targetUserRef = doc(db, 'users', targetUserId);

  // أضف الطلب للطرف الآخر كـ "وارد"
  await updateDoc(targetUserRef, {
    'friendRequests.incoming': arrayUnion(currentUserId),
  });

  // أضف الطلب للطرف الحالي كـ "صادر"
  await updateDoc(currentUserRef, {
    'friendRequests.outgoing': arrayUnion(targetUserId),
  });
}
