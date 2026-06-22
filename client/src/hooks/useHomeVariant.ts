import { useState } from 'react';

export const HOME_VARIANTS = ['rails', 'bento', 'cinematic', 'foryou'] as const;
export type HomeVariant = (typeof HOME_VARIANTS)[number];

const STORAGE_KEY = 'home-variant';
const DEFAULT_VARIANT: HomeVariant = 'rails';

const readStored = (): HomeVariant => {
  if (typeof window === 'undefined') return DEFAULT_VARIANT;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return HOME_VARIANTS.includes(stored as HomeVariant)
    ? (stored as HomeVariant)
    : DEFAULT_VARIANT;
};

const useHomeVariant = () => {
  const [variant, setVariantState] = useState<HomeVariant>(readStored);

  const setVariant = (next: HomeVariant) => {
    setVariantState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return [variant, setVariant] as const;
};

export default useHomeVariant;
