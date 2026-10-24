import { createContext, useContext } from 'react';
import type { AuthContextModel } from '../model/auth';

export const AuthContext = createContext<AuthContextModel>({
    accessToken: '',
    refreshToken: '',
    userId: '',
    name: '',
    login: () => {},
    logout: () => {},
    updateUserInfo: () => {},
});

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(`${useAuth.name} должен использоваться только внутри ${AuthContext.Provider.name}`);
    }

    return authContext;
};

export const useAuthContext = useAuth;
