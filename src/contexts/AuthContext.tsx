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
  user: {
    id: number;
    fullName: string;
    cpf: string;
    email: string;
  };
}

interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  token: string;
  user: {
    id: number;
    fullName: string;
    cpf: string;
    email: string;
  };
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

  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('poderrosas.token');
    const user = Cookies.get('poderrosas.user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {
      token: '',
      user: {
        id: 0,
        fullName: '',
        cpf: '',
        email: '',
      },
    };
  });

  const signIn = useCallback(
    async ({ email, password }: User) => {
      setLoading(true);
      try {
        const response = await api.post('auth/login', {
          email,
          password,
        });

        const { token, data: user } = response.data;
        Cookies.set('poderrosas.token', token, { expires: 7 });
        Cookies.set('poderrosas.user', JSON.stringify(user), { expires: 7 });

        setData({ token, user });
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
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
