import { Cheese } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddCheeseResponse extends ApiResponse {
    cheese: Cheese;
}