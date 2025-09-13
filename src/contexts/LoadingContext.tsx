import { createContext, ReactNode, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLoading } from '@/store/uiSlice';

export type LoadingContextData = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const LoadingContext = createContext({} as LoadingContextData);

 type AuthContextProps = {
  children: ReactNode;
};

 export function LoadingProvider({ children }: AuthContextProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.ui.loading);

  const updatedValue = useMemo(
    () => ({
      loading,
      setLoading: (value: boolean) => dispatch(setLoading(value)),
    }),
    [dispatch, loading],
  );
  return <LoadingContext.Provider value={updatedValue}>{children}</LoadingContext.Provider>;
}
