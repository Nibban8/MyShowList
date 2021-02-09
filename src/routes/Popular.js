import React, { useState } from 'react';
import useSearch from '../useSearch';

export default function Popular() {
  // https://api.themoviedb.org/3/tv/popular
  // https://api.themoviedb.org/3/tv/top_rated

  const { shows, error } = useSearch('https://api.themoviedb.org/3/tv/popular');

  return (
    <div>
      <h1>on Pop</h1>
      {shows.map((show, index) => {
        return <h4>{show.name}</h4>;
      })}
    </div>
  );
}
