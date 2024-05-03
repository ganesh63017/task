import React, { useState } from "react";

const styles = {
  padding: "10px",
  backgroundColor: "lightblue",
  border: "none",
  borderRadius: "6px",
  fontFamily: "monospace",
  margin: "10px",
  cursor: "pointer",
};

const inputStyles = {
  padding: "10px",
  minWidth: "320px",
  fontFamily: "monospace",
  borderRadius: "6px",
  marginLeft: "10px",
};

// Component for URL Shortener Service
function URLShortener() {
  const [urlMap, setUrlMap] = useState(new Map());
  const [longURL, setLongURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");

  // Function to generate a unique short code
  const generateShortCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6; // Length of the short code
    let shortCode = "";
    for (let i = 0; i < length; i++) {
      shortCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return shortCode;
  };

  // Function to encode URL
  const encodeURL = () => {
    const shortCode = generateShortCode();
    const newUrlMap = new Map(urlMap);
    newUrlMap.set(shortCode, longURL);
    setUrlMap(newUrlMap);
    setShortenedURL(`https://example.com/${shortCode}`); // Change example.com to your domain
  };

  // Function to decode URL and redirect
  const decodeURL = (shortURL) => {
    const shortCode = shortURL.split("/").pop();
    const longURL = urlMap.get(shortCode);
    if (longURL) {
      window.location.href = longURL;
    } else {
      console.error("Invalid shortened URL");
      // Handle gracefully - Redirect to an error page or display a message
    }
  };

  return (
    <div>
      <h1>URL Shortener Service</h1>
      <label htmlFor="longURL">Long URL:</label>
      <input
        style={inputStyles}
        type="text"
        id="longURL"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
      />
      <button style={styles} onClick={encodeURL}>
        Shorten URL
      </button>
      {shortenedURL && (
        <div>
          <p>
            Shortened URL:{" "}
            <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
              {shortenedURL}
            </a>
          </p>
          <p>Original URL: {longURL}</p>
        </div>
      )}
      <br />
      <label htmlFor="shortURL">Shortened URL:</label>
      <input style={inputStyles} type="text" id="shortURL" />
      <button
        style={styles}
        onClick={() => decodeURL(document.getElementById("shortURL").value)}
      >
        Decode URL
      </button>
    </div>
  );
}

export default URLShortener;
