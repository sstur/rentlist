import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type SizeEvent = {
  window: ScaledSize;
  screen: ScaledSize;
};

export default function useDimensions(): ScaledSize {
  let [dimensions, setDimensions] = useState<ScaledSize>(() =>
    Dimensions.get('window'),
  );
  useEffect(() => {
    let handler = ({ window }: SizeEvent) => {
      setDimensions(window);
    };
    Dimensions.addEventListener('change', handler);
    return () => {
      Dimensions.removeEventListener('change', handler);
    };
  }, []);
  return dimensions;
}
