import { createContext, ReactNode, useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import api from '@/services';
import { useLoading } from '@/hooks/useLoading';
import { useSnackbar } from 'notistack';

interface User {
  email?: string;
  password?: string;
}

interface AuthState {
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  authToken: string;

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
    async ({ email, password }: User) => {
      setLoading(true);
      try {
        const response = await api.post('auth/login', {
          email,
          password,
        });

        const { authToken } = response.data;
        Cookies.set('poderrosa', response.data.authToken, { expires: 7 });

        // @ts-ignore
        setData({ authToken });
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
        authToken: data.token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
