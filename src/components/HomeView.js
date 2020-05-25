import React, { useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';
import SiteLogo from './SiteLogo';

export default function HomeView() {
  useDocumentTitle();

  return (
    <div className="c-home-view u-margin-top-large">
      <SiteLogo size="large" />
      <RSSForm />
    </div>
  );
}

function RSSForm() {
  let navigate = useNavigate();
  const [rssFeed, setRssFeed] = useState("");

  function isValidUrl(string) {
    try {
      new URL(string);
    } catch (e) {
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    if (isValidUrl(rssFeed)) {
      navigate('/podcast?rss=' + encodeURIComponent(rssFeed));
    }
    event.preventDefault();
  }

  function handleImFeelingLucky(event) {
    const obsessedWithPodcast = "https://podcasts.files.bbci.co.uk/p0742833.rss"
    navigate('/podcast?rss=' + encodeURIComponent(obsessedWithPodcast));
    event.preventDefault();
  }

  function handleChange(event) {
    setRssFeed(event.target.value);
  }

  const disabled = !isValidUrl(rssFeed);

  return (
    <form onSubmit={handleSubmit} className="c-rss-form u-margin-top-large">
      <div className="c-rss-form__input-wrap u-margin-bottom-large">
        <input
          type="url"
          value={rssFeed}
          onChange={handleChange}
          placeholder="Enter a podcast RSS feed…"
          className="c-rss-form__input"
        />
      </div>
      <div className="c-rss-form__actions">
        <button type="submit" className="c-rss-form__button" onClick={handleSubmit} disabled={disabled}>
          Play Podcast
        </button>
        <button type="button" className="c-rss-form__button" onClick={handleImFeelingLucky}>
          I’m Feeling Lucky
        </button>
      </div>
    </form>
  );
}
