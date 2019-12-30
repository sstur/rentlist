import { useCallback, useState } from 'react';

export default function useFormData<Obj extends object, K extends keyof Obj>(
  obj: Obj,
): [Obj, (key: K, value: Obj[K]) => void] {
  let [formData, setFormData] = useState(obj);
  let update = useCallback((key: K, value: Obj[K]) => {
    setFormData((formData) => ({ ...formData, [key]: value }));
  }, []);
  return [formData, update];
}
