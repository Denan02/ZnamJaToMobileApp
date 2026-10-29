import { useEffect, useState } from 'react';

type AsyncState<T> = { data: T | undefined; loading: boolean };

/** Minimalno učitavanje podataka; kad se uvede API, može se zamijeniti React Query-jem. */
export function useAsync<T>(load: () => Promise<T>, deps: string[] = []): AsyncState<T> {
  const key = deps.join('|');
  const [result, setResult] = useState<{ key: string; data: T }>();

  useEffect(() => {
    let cancelled = false;
    load().then((data) => {
      if (!cancelled) setResult({ key, data });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const ready = result?.key === key;
  return { data: ready ? result.data : undefined, loading: !ready };
}
