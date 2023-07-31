import { useCallback, useEffect, useRef, useState } from 'react';
// import Cookies from 'universal-cookie'
import { API } from 'aws-amplify';

// type MethodTypes = "get" | "post" | "patch" | "del" | "put";
// type MethodTypes = "GET" | "POST" | "PATCH" | "DEL" | "PUT";
export const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const cookies = new Cookies()

  const activeHttpRequests = useRef();

  const sendRequest = useCallback(
    async (
      url,
      method,
      apiName,
      body = {},
      headers = {},
      queryStringParameters = {}
    ) => {
      setLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        let requestExtraParams = {
          headers: {
            ...headers,
          },
          queryStringParameters,
          body,
          response: true,
        };

        const response = await API[`${method}`](
          apiName,
          url,
          requestExtraParams
        );
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => {
            reqCtrl !== httpAbortCtrl;
          }
        );
        if (response.status >= 400) {
          throw new Error(response.data.message);
        }
        setLoading(false);
        return response.data;
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    return () =>
      activeHttpRequests.current.forEach((abortCtrl) => {
        abortCtrl.abort();
      });
  });

  const clearError = () => setError(null);

  return { loading, error, sendRequest, clearError };
};
