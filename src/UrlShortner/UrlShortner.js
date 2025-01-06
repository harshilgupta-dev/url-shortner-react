import React, { useState, useCallback } from 'react';
import './UrlShortner.css';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
    // Reset states when input changes
    setError('');
    setShortenedUrl('');
    setIsCopied(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const BASE_URL = 'http://18.208.214.158:7000';

  const handleButtonClick = useCallback(async () => {
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }

    setError('');
    setIsLoading(true);
    setShortenedUrl('');
    setIsCopied(false);

    try {
      const apiUrl = `${BASE_URL}/url/shorten?longUrl=${url}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to shorten the URL. Please try again.');
      }

      // Get the shortCode as plain text
      const shortCode = await response.text();
      // Construct the full shortened URL
      const fullShortUrl = `${BASE_URL}/url/${shortCode}`;

      setShortenedUrl(fullShortUrl);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div>
      <div className="shortener-box">
        <h1>Shorten a long link</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="https://example.com/my-long-url"
            className="url-input"
            value={url}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />

          <button 
            className={`shorten-button ${isLoading ? 'loading' : ''}`} 
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading ? 'Shortening...' : 'Get your link for free →'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {shortenedUrl && (
          <div className="result-container">
            <p className="shortened-url">
              Your shortened URL: 
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                {shortenedUrl}
              </a>
              <button 
                className={`copy-button ${isCopied ? 'copied' : ''}`}
                onClick={() => copyToClipboard(shortenedUrl)}
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
