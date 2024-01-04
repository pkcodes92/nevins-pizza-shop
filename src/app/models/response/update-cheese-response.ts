import { Cheese } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateCheeseResponse extends ApiResponse {
    cheese: Cheese;
}