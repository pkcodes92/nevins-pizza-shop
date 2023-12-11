import { PizzaSize } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdatePizzaSizeResponse extends ApiResponse {
    pizzaSize: PizzaSize;
}