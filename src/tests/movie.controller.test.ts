import axios, { AxiosRequestConfig } from "axios";
import { MovieController } from "../controllers/movie.controller";
import { Movie } from "../models/movie.model";
import { Quote } from "../models/quote.model";
import { ApiService } from "../shared/service/api.service";

// Create a mock for the ApiService
jest.mock("../shared/service/api.service");
jest.mock('axios');
const MockApiService = ApiService as jest.MockedClass<typeof ApiService>;

describe("MovieController", () => {
  let movieController: MovieController;
  let apiService: ApiService;
  const mockedConfig: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en-us',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  beforeEach(() => {
    apiService = new MockApiService(mockedConfig);
    movieController = new MovieController("https://example-api.com");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getMovies", () => {
    it("should return an array of movies", async () => {
      const movies: Movie[] = [
        { id: "1", title: "Movie 1", releaseYear: 2001, director: "Director 1" },
        { id: "2", title: "Movie 2", releaseYear: 2002, director: "Director 2" },
      ];
      const response = { data: movies };
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await movieController.getMovies();

      expect(apiService.get).toHaveBeenCalledWith("https://example-api.com/movie");
      expect(result).toEqual(movies);
    });

    it("should throw an error if unable to retrieve movies", async () => {
      const error = new Error("API error");
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(error);

      await expect(movieController.getMovies()).rejects.toThrow(
        "Unable to retrieve movies: API error"
      );
    });
  });

  describe("getMovie", () => {
    it("should return a movie by ID", async () => {
      const movie: Movie = { id: "1", title: "Movie 1", releaseYear: 2001, director: "Director 1" };
      const response = { data: movie };
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await movieController.getMovie("1");

      expect(apiService.get).toHaveBeenCalledWith("https://example-api.com/movie/1");
      expect(result).toEqual(movie);
    });

    it("should throw an error if unable to retrieve the movie", async () => {
      const error = new Error("API error");
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(error);

      await expect(movieController.getMovie("1")).rejects.toThrow(
        "Unable to retrieve movie 1: API error"
      );
    });
  });

  describe("getMovieQuotes", () => {
    it("should return an array of quotes for a movie", async () => {
      const quotes: Quote[] = [
        { id: "1", movieId: "1", text: "Quote 1", character: "Character 1" },
        { id: "2", movieId: "1", text: "Quote 2", character: "Character 2" },
      ];
      const response = { data: quotes };
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await movieController.getMovieQuotes("1");

      expect(apiService.get).toHaveBeenCalledWith("https://example-api.com/movie/1/quote");
      expect(result).toEqual(quotes);
    });

    it("should throw an error if unable to retrieve the quotes", async () => {
      const error = new Error("API error");
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(error);

      await expect(movieController.getMovieQuotes("1")).rejects.toThrow(
        "Unable to retrieve quote 1: API error"
      );
    });
  });
});