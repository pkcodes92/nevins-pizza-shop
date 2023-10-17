import { Topping } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetToppingsResponse extends ApiResponse {
    toppings: Topping[];
}