import { MovieController } from "./controllers/movie.controller";
import { QuoteController } from "./controllers/quote.controller";
import { Movie } from "./models/movie.model";
import { Quote } from "./models/quote.model";

export class LordOfTheRingsSDK {
  private movieController: MovieController;
  private quoteController: QuoteController;

  constructor(baseUrl: string) {
    this.movieController = new MovieController(baseUrl);
    this.quoteController = new QuoteController(baseUrl);
  }

  async getMovies(): Promise<Movie[]> {
    return this.movieController.getMovies();
  }

  async getMovie(id: string): Promise<Movie> {
    return this.movieController.getMovie(id);
  }

  async getMovieQuotes(id: string): Promise<Quote[]> {
    return this.movieController.getMovieQuotes(id);
  }

  async getQuotes(): Promise<Quote[]> {
    return this.quoteController.getQuotes();
  }

  async getQuote(id: string): Promise<Quote> {
    return this.quoteController.getQuote(id);
  }
}