import React from 'react';
import { Button } from '@material-ui/core';

export default function SectionHeader({ title, handleSort }) {
  return (
    <div className='section-header'>
      <h1>{title}</h1>
      <Button onClick={handleSort} color='secondary'>
        Sort
      </Button>
    </div>
  );
}
