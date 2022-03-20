// Caso de uso del useRef <- Mantener la ref para q al efectuar Cambios NO se dispare la renderizacion

import { useEffect, useRef, useState } from 'react';

export const useFetch = url => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      // Este cambio NO va a lanzar la renderizacion xq useRef mantiene al ref al mismo
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Para q aparezca el loading con cada click
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data,
          });
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo cargar la info!',
        });
      });
  }, [url]);

  return state;
};
