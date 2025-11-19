'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import styles from './styles.module.css';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [competitions, setCompetitions] = useState<any[]>([]);

  useEffect(() => {
    const competitionsCol = collection(db, 'competitions');

    // setting up real-time listeners for each competition
    const unsubscribe = onSnapshot(
      competitionsCol,
      (snapshot) => {
        const competitionsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompetitions(competitionsList);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching competitions:', error);
      }
    );

    // clean up listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.allCompsContainer}>
          {competitions.map((comp) => (
            <div key={comp.id} className={styles.singleCompContainer}>
              <div className={styles.teamContainer}>
                <p className={styles.teamName}>{comp.team1Name}</p>
                <p className={styles.teamScore}>{comp.team1Score}</p>
              </div>
              <div className={styles.teamContainer}>
                <p className={styles.teamName}>{comp.team2Name}</p>
                <p className={styles.teamScore}>{comp.team2Score}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
