import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { app } from './firebase'; // 這裡改成 import app

const auth = getAuth(app);

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('登入失敗:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('登出失敗:', error);
  }
};

export const onUserChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};