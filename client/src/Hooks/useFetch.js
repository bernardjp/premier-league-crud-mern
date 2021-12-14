import { useEffect, useReducer } from 'react';

const initialState = { loading: false, data: null, error: null };

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOADING':
      return {
        ...state, loading: true, data: null, error: null
      };
    case 'SUCCESS':
      return {
        ...state, loading: false, data: payload, error: null
      };
    case 'ERROR':
      return {
        ...state, loading: false, data: null, error: payload
      };
    default:
      return state;
  }
};

const useFetch = (fetchData, queryParams) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(async () => {
    dispatch({ type: 'LOADING' });

    try {
      const resourceData = await fetchData(queryParams);
      const { resourceType } = queryParams;
      dispatch({ type: 'SUCCESS', payload: { resourceData, resourceType } });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: { message: error.message } });
    }
  }, [fetchData, queryParams]);

  return state;
};

export default useFetch;
