# Lord of the Rings SDK

The Lord of the Rings SDK is a software development kit that provides easy access to information about the Lord of the Rings trilogy. It allows developers to consume data from the Lord of the Rings API in a convenient way.

## Installation

To install the Lord of the Rings SDK, you can use the package manager `npm`. Run the following command in your project directory:


## Usage

To use the Lord of the Rings SDK in your project, you need to import the package and create an instance of the `LordOfTheRingsSDK` class:

```javascript
const { LordOfTheRingsSDK } = require("lord-of-the-rings-sdk");

const sdk = new LordOfTheRingsSDK("https://api.example.com");

// Fetch movies
sdk.getMovies()
  .then((movies) => {
    console.log("Movies:", movies);
  })
  .catch((error) => {
    console.error("Failed to fetch movies:", error.message);
  });

// Fetch a movie by ID
const movieId = "1";
sdk.getMovie(movieId)
  .then((movie) => {
    console.log("Movie:", movie);
  })
  .catch((error) => {
    console.error(`Failed to fetch movie ${movieId}:`, error.message);
  });

// Fetch quotes for a movie
const movieId = "1";
sdk.getMovieQuotes(movieId)
  .then((quotes) => {
    console.log("Quotes:", quotes);
  })
  .catch((error) => {
    console.error(`Failed to fetch quotes for movie ${movieId}:`, error.message);
  });

// Fetch all quotes
sdk.getQuotes()
  .then((quotes) => {
    console.log("Quotes:", quotes);
  })
  .catch((error) => {
    console.error("Failed to fetch quotes:", error.message);
  });

// Fetch a quote by ID
const quoteId = "1";
sdk.getQuote(quoteId)
  .then((quote) => {
    console.log("Quote:", quote);
  })
  .catch((error) => {
    console.error(`Failed to fetch quote ${quoteId}:`, error.message);
  });
```

## Testing

To run the tests for the Lord of the Rings SDK, you can use the following command:

```
npm test
```

## Publish

Once you have completed the implementation, you can publish the SDK to npm using the following command:

```
npm publish
```