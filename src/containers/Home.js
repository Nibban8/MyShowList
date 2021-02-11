import React, { useState } from 'react';
import useSearch from '../useSearch';
import Tendencias from './Tendencias';
import Top from './Top';
export default function Home() {
  const { shows, error } = useSearch(
    null,
    1,
    `${process.env.REACT_APP_BASE_URL}trending/tv/week`
  );

  return (
    <div>
      <Tendencias onHome={true} />
      <Top onHome={true} />
    </div>
  );
}
