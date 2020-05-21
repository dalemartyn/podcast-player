import { useLayoutEffect, useEffect } from 'react';
import { useAppDispatch } from '../AppStateProvider';

export async function getPodcastData(url) {
  const res = await fetch('/.netlify/functions/get-all-episodes', {
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

  useLayoutEffect(() => {
    dispatch({
      type: 'SET_FEED',
      data: {
        url
      }
    });
  }, [url, dispatch]);

  useEffect(() => {
    async function fetchData() {
      try {
        const podcastData = await getPodcastData(url);
        dispatch({
          type: 'ADD_FEED',
          data: {
            podcastData,
            url
          }
        });
      } catch (e) {
        dispatch({
          type: 'SET_FEED',
          data: {
            error: e.toString(),
            url
          }
        });
      }
    }
    fetchData();
  }, [url, dispatch]);
}
