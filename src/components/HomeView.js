import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function HomeView() {
  useDocumentTitle();

  return (
    <h1 className="ts-page-title u-margin-top-large u-margin-bottom-xxlarge">Podcasts</h1>
  );
}
