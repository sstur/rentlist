import { User } from '../types/User';
import { useReducer, useEffect, useCallback } from 'react';
import * as Api from '../helpers/Api';

type State = {
  isLoading: boolean;
  error: string | null;
  data: Array<User>;
};

type Action =
  | {
      type: 'FETCH_STARTED';
    }
  | {
      type: 'FETCH_FAILED';
      error: string;
    }
  | {
      type: 'FETCH_SUCCEEDED';
      data: Array<User>;
    };

export function getInitialState(): State {
  return {
    isLoading: false,
    error: null,
    data: [],
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_STARTED': {
      return { ...state, isLoading: true, error: null };
    }
    case 'FETCH_FAILED': {
      return { ...state, isLoading: false, error: action.error };
    }
    case 'FETCH_SUCCEEDED': {
      return { ...state, isLoading: false, data: action.data };
    }
    default: {
      return state;
    }
  }
}

export function useFetch() {
  let [state, dispatch] = useReducer(reducer, null, getInitialState);
  let fetch = useCallback(async () => {
    dispatch({ type: 'FETCH_STARTED' });
    let result = await Api.fetchUsers();
    if (result.success) {
      dispatch({ type: 'FETCH_SUCCEEDED', data: result.data });
    } else {
      dispatch({ type: 'FETCH_FAILED', error: result.error });
    }
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { state, refresh: fetch };
}
