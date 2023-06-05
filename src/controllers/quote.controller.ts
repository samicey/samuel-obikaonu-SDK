import { Quote } from "../models/quote.model";
import { ApiService } from "../shared/service/api.service";
export class QuoteController {
    private apiBaseUrl: string;
    private apiService: ApiService;

    constructor(apiBaseUrl: string) {
      this.apiBaseUrl = apiBaseUrl;
      this.apiService = new ApiService();
    }
  
    async getQuotes(): Promise<Quote[]> {
      try {
        const response = await this.apiService.get(
          `${this.apiBaseUrl}/quote`
        );
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch quotes: ${error.message}`);
      }
    }
  
    async getQuote(id: string): Promise<Quote> {
      try {
        const response = await this.apiService.get(
          `${this.apiBaseUrl}/quote/${id}`
        );
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch quote with ID ${id}: ${error.message}`);
      }
    }
  }