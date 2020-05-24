import { useEffect, useLayoutEffect } from 'react';
import { useAppDispatch } from '../AppStateProvider';

export async function getPodcastData(url) {
  const res = await fetch('/.netlify/functions/get-recent-episodes', {
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

export default function usePodcast(url) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch({
      type: 'SET_PODCAST',
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
          type: 'ADD_PODCAST',
          data: {
            podcastData,
            url
          }
        });
      } catch (e) {
        dispatch({
          type: 'SET_PODCAST',
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
