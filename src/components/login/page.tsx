'use client';

import {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/firebase/auth';
import { UserContext, UserContextType } from '@/context/UserContext';
import { Profile } from '@/types';
import styles from './styles.module.css';

type FormData = {
  email: string;
  password: string;
};

export default function Login(){
  // context variables
  const { signedIn,setSignedIn,profile,setProfile } = useContext(
    UserContext
  ) as UserContextType;

  // local state variables
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [saving, setSaving] = useState<boolean>(false);
  const router = useRouter();

  // Event handler for input change
  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // regular login handler function
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);
      const { profile, status, code, message } = await signIn(formData);

      if (status !== 200) {
        console.log(message);
        return;
      }

      // set context to set up real time listeners on profile
      setSignedIn(true)
      setProfile(profile as Profile);

      router.push('/');

    } catch (error) {
      console.log({ 'error:': error });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (signedIn) {
      router.push('/');
    }
  }, [signedIn, router]);

  if (!signedIn)
    return (
      <div className={styles.mainContainer}>
      <form onSubmit={handleLogin} className={styles.form}>
        <input id={'email'}
          disabled={saving}
          required={true}
          placeholder={'Email'}
          onChange={handleLoginInputChange}
          type={'email'}
          value={formData.email}
        />

        <input id={'password'}
          disabled={saving}
          required={true}
          placeholder={'Password'}
          onChange={handleLoginInputChange}
          type={'password'}
          value={formData.password}
        />

        <button type={'submit'} disabled={saving}>
          Sign in
        </button>
      </form>
      </div>
    );
};