import React, {
  forwardRef,
  ReactElement,
  Ref,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View, SafeAreaView } from 'react-native';
import { Snackbar } from './core-ui';

type ShowMessage = (message: string) => void;

type Props = {
  children: (showMessage: ShowMessage) => ReactElement;
};

type Handle = {
  showMessage: ShowMessage;
};

export const ToastProvider = forwardRef((props: Props, ref: Ref<Handle>) => {
  let [message, setMessage] = useState('');
  useImperativeHandle(ref, () => ({
    showMessage: (message: string) => {
      setMessage(message);
    },
  }));
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {props.children(setMessage)}
        <Snackbar visible={message !== ''} onDismiss={() => setMessage('')}>
          {message}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
});

export function useToast(): [ShowMessage, RefObject<Handle>] {
  let ref = useRef<Handle | null>(null);
  let showMessage = useCallback((message: string) => {
    ref.current && ref.current.showMessage(message);
  }, []);
  return [showMessage, ref];
}
