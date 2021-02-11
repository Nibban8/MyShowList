import React, { useState } from 'react';
import useSearch from '../useSearch';

export default function Tendencias(props) {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { shows, error, loading } = useSearch(`${baseUrl}trending/tv/week`);

  return (
    <div>
      <h1 key={1}>on Pop</h1>
      {shows.map((show, index) => {
        return <h4>{show.name}</h4>;
      })}
    </div>
  );
}
