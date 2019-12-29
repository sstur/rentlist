import React, {
  useRef,
  RefObject,
  ReactNode,
  createContext,
  useMemo,
  useContext,
  useState,
} from 'react';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { NavigationContainerRef } from '@react-navigation/native';
import DrawerContent from '../components/DrawerContent';
import useDimensions from '../helpers/useDimensions';
import { useAuth } from '../components/AuthenticationProvider';

type Props = {
  navRef: RefObject<NavigationContainerRef>;
  children: ReactNode;
};

type ContextType = {
  openDrawer: () => void;
  closeDrawer: () => void;
  setEnabled: (isEnabled: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Context = createContext<ContextType>(null as any);

export function DrawerProvider(props: Props) {
  let { navRef, children } = props;
  let { width } = useDimensions();
  let drawerRef = useRef() as RefObject<DrawerLayout>;
  let [isEnabled, setEnabled] = useState(true);
  let { currentUser } = useAuth();
  let context = useMemo(
    () => ({
      openDrawer: () => {
        drawerRef.current && drawerRef.current.openDrawer();
      },
      closeDrawer: () => {
        drawerRef.current && drawerRef.current.closeDrawer();
      },
      setEnabled: (isEnabled: boolean) => {
        setEnabled(isEnabled);
      },
    }),
    [drawerRef],
  );
  return (
    <DrawerLayout
      ref={drawerRef}
      drawerLockMode={!isEnabled || !currentUser ? 'locked-closed' : 'unlocked'}
      drawerWidth={width - 64}
      keyboardDismissMode="on-drag"
      renderNavigationView={() => (
        <DrawerContent navRef={navRef} closeDrawer={context.closeDrawer} />
      )}
    >
      <Context.Provider value={context}>{children}</Context.Provider>
    </DrawerLayout>
  );
}

export function useDrawer() {
  return useContext(Context);
}
