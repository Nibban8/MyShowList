import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useSearch(url, pageNumber, query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shows, setShows] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setShows([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: url,
      params: { api_key: '392dcca9c3aba6e2263f0c9dd8e5be23', page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        /* Trucaso aqui, de dentro hacia afuera la siguiente linea, une el arreglo de peliculas anteriores y peliculas siguientes obtenidas en el request. Con "Set" eliminamos los repetidos y con el spread convertimos nuevamente el Set a un arreglo*/
        setShows((prevShows) => {
          return [
            ...new Set([...prevShows, ...res.data.results.map((b) => b)]),
          ];
        });
        // Solo funcionaba usando el puro titulo, al parecer existen elementos con el mismo id y no son equal().

        setHasMore(res.data.total_pages > res.data.page); // Si no hay mas resultados retorna false

        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        setLoading(false);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, shows, hasMore };
}
