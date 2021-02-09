import React, { useState } from 'react';
import useSearch from '../useSearch';
import Popular from './Popular';
import Top from './Top';
export default function Home() {
  // https://api.themoviedb.org/3/tv/popular
  // https://api.themoviedb.org/3/tv/top_rated

  const { shows, error } = useSearch(
    null,
    1,
    'https://api.themoviedb.org/3/trending/tv/week'
  );

  return (
    <div>
      <Popular onHome={true} />
      <Top onHome={true} />
    </div>
  );
}
