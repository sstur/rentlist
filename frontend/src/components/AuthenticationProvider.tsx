import React, {
  useEffect,
  useState,
  ReactElement,
  createContext,
  useMemo,
  useContext,
} from 'react';
import * as Api from '../helpers/Api';
import { User } from '../types/User';

type Props = {
  children: ReactElement;
};

type ContextType = {
  logout: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Context = createContext<ContextType>(null as any);

function AuthenticationProvider(props: Props) {
  let [isLoading, setLoading] = useState(true);
  let [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    Api.getCurrentUser().then((result) => {
      setCurrentUser(result.success ? result.data : null);
      setLoading(false);
    });
  }, []);
  let context = useMemo(
    () => ({
      logout: () => {
        Api.logout();
        setCurrentUser(null);
      },
      setCurrentUser,
      currentUser,
    }),
    [currentUser],
  );
  if (isLoading) {
    return null;
  } else {
    return (
      <Context.Provider value={context}>{props.children}</Context.Provider>
    );
  }
}

export function useAuth() {
  return useContext(Context);
}

export default AuthenticationProvider;
