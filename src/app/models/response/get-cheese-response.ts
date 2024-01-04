import { Cheese } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCheeseResponse extends ApiResponse {
    cheese: Cheese;
}