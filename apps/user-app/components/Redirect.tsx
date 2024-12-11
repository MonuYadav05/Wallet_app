'use client';

import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

export function Redirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, []);

  return <div></div>;
}