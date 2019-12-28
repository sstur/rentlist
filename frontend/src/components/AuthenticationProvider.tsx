import { useEffect, useState, ReactElement } from 'react';
import * as Api from '../helpers/Api';

type Props = {
  children: (isAuthenticated: boolean) => ReactElement;
};

function AuthenticationProvider(props: Props) {
  let [authStatus, setAuthStatus] = useState<boolean | null>(null);
  useEffect(() => {
    Api.checkAuth().then((result) => {
      setAuthStatus(result.success);
    });
  }, []);
  if (authStatus == null) {
    return null;
  } else {
    return props.children(authStatus);
  }
}

export default AuthenticationProvider;
