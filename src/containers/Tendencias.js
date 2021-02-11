import React, { useState, useRef, useCallback } from 'react';
import useSearch from '../useSearch';
import Loading from '../components/Loading';

export default function Tendencias(props) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, shows, hasMore } = useSearch(
    `${baseUrl}trending/tv/week`,
    pageNumber
  );

  const observer = useRef();

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !props.onHome) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <h1>ON TENDENCIAS</h1>
      {shows.map((show, index) => {
        let reference;
        if (shows.length === index + 1) {
          reference = lastMovieElementRef;
        }
        return (
          <div key={show.id} ref={reference}>
            <h4>{show.name}</h4>
          </div>
        );
      })}
      <div>{loading && <Loading />}</div>
    </div>
  );
}
