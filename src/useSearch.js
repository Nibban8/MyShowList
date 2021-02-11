import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useSearch(url, pageNumber, sorted, query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shows, setShows] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  function compare(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

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
      params: { api_key: process.env.REACT_APP_API_KEY, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        /* Trucaso aqui, de dentro hacia afuera la siguiente linea, une el arreglo de peliculas anteriores y peliculas siguientes obtenidas en el request. Con "Set" eliminamos los repetidos y con el spread convertimos nuevamente el Set a un arreglo*/
        setShows((prevShows) => {
          let results = [...prevShows, ...res.data.results];

          if (sorted) {
            results = results.sort(compare);
          }

          let uniqueResults = Array.from(new Set(results.map((a) => a.id))).map(
            (id) => {
              return results.find((a) => a.id === id);
            }
          );

          return uniqueResults;

          // return [
          //   ...new Set([...prevShows, ...res.data.results.map((b) => b)]),
          // ];
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
  }, [query, pageNumber, sorted]);

  return { loading, error, shows, hasMore };
}
