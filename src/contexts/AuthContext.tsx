import { createContext, ReactNode, useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import api from '@/services';
import { useLoading } from '@/hooks/useLoading';
import { useSnackbar } from 'notistack';

interface User {
  identifier?: string;
  password?: string;
}

interface AuthState {
  token: string;
}

interface SignInCredentials {
  identifier: string;
  password: string;
}

export interface AuthContextData {
  token: string;

  signIn(credentials: SignInCredentials): Promise<void>;

  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  // const toast = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('poderrosas.token');

    if (token) {
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ identifier, password }: User) => {
      setLoading(true);
      console.log('signIn', identifier);
      console.log('signIn', password);
      try {
        const response = await api.post('auth/local', {
          identifier,
          password,
        });

        const { token } = response.data;
        Cookies.set('poderrosa', response.data.token, { expires: 7 });
        setData({ token });
      } catch (err) {
        enqueueSnackbar('Erro na Autenticação, verificar credenciais informadas.', {
          variant: 'error',
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [enqueueSnackbar, setLoading],
  );

  const signOut = useCallback(() => {
    Cookies.remove('poderrosas.token');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
