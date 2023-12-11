import { PizzaSize } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetPizzaSizeResponse extends ApiResponse {
    pizzaSize: PizzaSize;
}