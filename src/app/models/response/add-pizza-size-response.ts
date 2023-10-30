import { PizzaSize } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddPizzaSizeResponse extends ApiResponse {
    pizzaSize: PizzaSize;
}