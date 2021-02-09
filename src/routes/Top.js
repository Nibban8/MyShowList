import React, { useState, useRef, useCallback } from 'react';
import useSearch from '../useSearch';

export default function Popular(props) {
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, shows, hasMore } = useSearch(
    'https://api.themoviedb.org/3/tv/top_rated',
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
      <h1>on Top</h1>
      {shows.map((show, index) => {
        let reference;
        if (shows.length === index + 1) {
          reference = lastMovieElementRef;
        }
        return (
          <div ref={reference}>
            <h4>{show.name}</h4>
          </div>
        );
      })}
    </div>
  );
}
