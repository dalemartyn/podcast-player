import { useEffect } from 'react';
import { useAppDispatch } from '../AppStateProvider';

export async function getPodcastData(url) {
  const res = await fetch('/.netlify/functions/get-podcast', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'url': url
    })
  });
  const json = await res.json();
  return json;
}

export default function usePodcastFeed(url) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: 'SET_FEED',
      data: {}
    });

    async function fetchData() {
      try {
        const data = await getPodcastData(url);
        dispatch({
          type: 'SET_FEED',
          data: data
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [url, dispatch]);
}
