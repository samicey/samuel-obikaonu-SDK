import axios, { AxiosRequestConfig } from "axios";
import { Quote } from "../models/quote.model";
import { ApiService } from "../shared/service/api.service";
import { QuoteController } from "../controllers/quote.controller";

// Create a mock for the ApiService
jest.mock("../shared/service/api.service");
jest.mock('axios');
const MockApiService = ApiService as jest.MockedClass<typeof ApiService>;

describe("QuoteController", () => {
  let quoteController: QuoteController;
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
    quoteController = new QuoteController("https://example-api.com");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getQuotes", () => {
    it("should return an array of quotes", async () => {
      const quotes: Quote[] = [
        { id: "1", movieId: "1", text: "Quote 1", character: "Character 1" },
        { id: "2", movieId: "2", text: "Quote 2", character: "Character 2" },
      ];
      const response = { data: quotes };
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await quoteController.getQuotes();

      expect(apiService.get).toHaveBeenCalledWith("https://example-api.com/quote");
      expect(result).toEqual(quotes);
    });

    it("should throw an error if unable to fetch quotes", async () => {
      const error = new Error("API error");
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(error);

      await expect(quoteController.getQuotes()).rejects.toThrow(
        "Failed to fetch quotes: API error"
      );
    });
  });

  describe("getQuote", () => {
    it("should return a quote by ID", async () => {
      const quote: Quote = { id: "1", movieId: "1", text: "Quote 1", character: "Character 1" };
      const response = { data: quote };
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await quoteController.getQuote("1");

      expect(apiService.get).toHaveBeenCalledWith("https://example-api.com/quote/1");
      expect(result).toEqual(quote);
    });

    it("should throw an error if unable to fetch the quote", async () => {
      const error = new Error("API error");
      (apiService.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(error);

      await expect(quoteController.getQuote("1")).rejects.toThrow(
        "Failed to fetch quote with ID 1: API error"
      );
    });
  });
});