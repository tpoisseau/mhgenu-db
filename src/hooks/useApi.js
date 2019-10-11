import {useReducer, useEffect} from 'react';
import pattern from 'pattern-matching';

const T_INIT = Object.freeze({type: 'FETCH_INIT'});
const T_SUCCESS = Object.freeze({type: 'FETCH_SUCCESS'});
const T_FAILURE = Object.freeze({type: 'FETCH_FAILURE'});
const DEFAULT_FETCH_TRANSFO = r => r.json();

const dataReducer = (state, action) => pattern(action)
  .match(T_INIT, () => ({...state, isLoading: true, isError: false}))
  .match(T_SUCCESS, ({data}) => ({data, isLoading: false, isError: false}))
  .match(T_FAILURE, ({error}) => ({error, isLoading: false, isError: true}))
  .default(({type}) => {throw new Error(`action ${type} not supported`)})
  .exec();

/**
 * @param {string} url
 * @param {RequestInit} [params]
 * @param {any[]} [deps] - provide reload dependencies, url automaticly added
 * @param {function} [fetchTransfo] - by default response => response.json()
 *
 * @return {{
 *   isLoading: boolean,
 *   isError: boolean,
 *   error?: null | Error,
 *   data?: null | *
 * }}
 */
export default function useApi(url, params, deps=[], fetchTransfo = DEFAULT_FETCH_TRANSFO) {
  const [state, dispatch] = useReducer(dataReducer, {
    isLoading: true,
    isError: false,
    error: void 0,
    data: void 0,
  });
  
  useEffect(() => {
    let isCancel = false;
    
    dispatch(T_INIT);
    fetch(url, params).then(fetchTransfo)
      .then(data => isCancel || dispatch({...T_SUCCESS, data}))
      .catch(error => isCancel || dispatch({...T_FAILURE, error}));
    
    return () => isCancel = true;
    // api user responsability to provide an exhaustive dependencies array
    // eslint-disable-next-line
  }, [url, ...deps]);
  
  return state;
}