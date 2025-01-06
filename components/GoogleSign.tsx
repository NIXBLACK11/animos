'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleSign() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/notes');
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.name}</p>
        <button 
          onClick={() => signOut()}
        >Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn('google')}>Sign In with Google</button>;
}
