import { Cheese } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCheesesResponse extends ApiResponse {
    cheeses: Cheese[];
}