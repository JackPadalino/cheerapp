'use client';

import { useState } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

import styles from './styles.module.css';

export default function MyGame() {
  const [loading, setLoading] = useState(false);

  const docId = 'MacMBVE25HNMU5HE7LKr'; // document ID
  const competitionRef = doc(db, 'competitions', docId);

  const updateScore = async (
    team: 'team1Score' | 'team2Score',
    amount: number
  ) => {
    setLoading(true);
    try {
      await updateDoc(competitionRef, {
        [team]: increment(amount),
      });
    } catch (error) {
      console.error(`Error updating ${team}:`, error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.pageName}>My Game</h1>
      <div className={styles.controls}>
        <div className={styles.buttonsContainer}>
          <p>Team 1 Score</p>
          <button
            onClick={() => updateScore('team1Score', 1)}
            disabled={loading}
          >
            +
          </button>

          <button
            onClick={() => updateScore('team1Score', -1)}
            disabled={loading}
          >
            -
          </button>
        </div>
        <div className={styles.buttonsContainer}>
          <p>Team 2 Score</p>
          <button
            onClick={() => updateScore('team2Score', 1)}
            disabled={loading}
          >
            +
          </button>
          <button
            onClick={() => updateScore('team2Score', -1)}
            disabled={loading}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
