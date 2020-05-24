import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  return (
    <>
      <h1 className="ts-page-title u-margin-bottom-xxlarge">404</h1>
      <p>The <code>{location.pathname}</code> route couldn’t be found.</p>
    </>
  )
}
