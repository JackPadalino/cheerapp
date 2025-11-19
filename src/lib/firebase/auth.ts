'use client';

import {
  signOut as _signOut,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db, auth } from './config';


export async function signIn({ email, password }: {email:string,password:string}) {
  try {
    const { user } = await _signInWithEmailAndPassword(auth, email, password);
    const usersRef = collection(db, 'profiles');
    const q = query(usersRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const profile = querySnapshot.docs[0].data();
    return { profile: profile, status: 200 };
  } catch (error: any) {
    return {
      code: error.code ?? 'auth_error',
      message: error.message ?? 'Authentication action failed',
      status: 400,
    };
  }
}



export async function signOut() {
  try {
    await _signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
