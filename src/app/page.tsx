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
    <div>
      <h1>Cheer App!</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {competitions.map((comp) => (
            <div key={comp.id}>
              <p>
                <strong>Team:</strong> {comp.team1Name} <strong>Score:</strong>{' '}
                {comp.team1Score}
              </p>
              <p>
                <strong>Team:</strong> {comp.team2Name} <strong>Score:</strong>{' '}
                {comp.team2Score}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
