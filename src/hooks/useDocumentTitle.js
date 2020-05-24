import { useLayoutEffect } from 'react';

export default function useDocumentTitle(title) {

  useLayoutEffect(() => {
    if (title) {
      document.title = title + ' / Podcasts';
    } else {
      document.title = 'Podcasts';
    }
  }, [title]);
}
