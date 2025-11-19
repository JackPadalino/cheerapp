'use client';

import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext, UserContextType } from '@/context/UserContext';
import { Profile } from '@/types';
import styles from './styles.module.css';

type Props = {
  signedIn: boolean;
  profile: Profile | undefined;
};

export default function Nav(){
  // context variables
  const { signedIn, resetUserContext } = useContext(
    UserContext
  ) as UserContextType;
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // reset context state
        resetUserContext();
        // Redirect to the login screen after successful sign out
        router.push('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.mainContainer}>
      {!signedIn ? (
        <>
          <Link href="/" className={styles.navItem}>Home</Link>
          <Link href="/login" className={styles.navItem}>Login</Link>
        </>
      ) : (
        <>
            <Link href="/" className={styles.navItem}>Home</Link>
            <Link href="/mygame" className={styles.navItem}>My Game</Link>
            <Link
                href="#"
                onClick={(e) => {
                    e.preventDefault() // stop <Link> from navigating immediately
                    handleSignOut()
                }}
                className={styles.navItem}
            >
                Sign Out
            </Link>
        </> 
      )}
    </div>
  );
};