import { ApiService } from "../shared/service/api.service";
import { Movie } from "../models/movie.model";
import { Quote } from "../models/quote.model";

export class MovieController {
    private apiBaseUrl: string;
    private apiService: ApiService;
  
    constructor(apiBaseUrl: string) {
      this.apiBaseUrl = apiBaseUrl;
      this.apiService = new ApiService();
    }
  
    async getMovies(): Promise<Movie[]> {
      try {
        const response = await this.apiService.get(
          `${this.apiBaseUrl}/movie`
        );
        return response.data;
      } catch (error) {
        throw new Error(`Unable to retrieve movies: ${error.message}`);
      }
    }
  
    async getMovie(id: string): Promise<Movie> {
      try {
        const response = await this.apiService.get(
          `${this.apiBaseUrl}/movie/${id}`
        );
        return response.data;
      } catch (error) {
        throw new Error(`Unable to retrieve movie ${id}: ${error.message}`);
      }
    }
  
    async getMovieQuotes(id: string): Promise<Quote[]> {
      try {
        const response = await this.apiService.get(
          `${this.apiBaseUrl}/movie/${id}/quote`
        );
        return response.data;
      } catch (error) {
        throw new Error(
          `Unable to retrieve quote ${id}: ${error.message}`
        );
      }
    }
  }