import byUrl from './byUrl';

export default function podcasts(state = {}, action) {
  return {
    byUrl: byUrl(state.byUrl, action),
    categories: state.categories
  }
}

export function getPodcast(state, url) {
  return state.byUrl[url];
}

export function getPodcastMeta(state, url) {
  const podcast = getPodcast(state, url);

  if (typeof podcast === 'undefined') {
    return null;
  }

  return podcast.meta;
}

export function getPodcastEpisodes(state, url) {
  const podcast = getPodcast(state, url);

  if (typeof podcast === 'undefined') {
    return null;
  }

  return podcast.episodes;
}

export function getPodcastErrorMessage(state, url) {
  const podcast = getPodcast(state, url);

  if (typeof podcast === 'undefined') {
    return null;
  }

  return podcast.errorMessage;
}

export function getPodcastIsFetching(state, url) {
  const podcast = getPodcast(state, url);

  if (typeof podcast === 'undefined') {
    return null;
  }

  return podcast.isFetching;
}
