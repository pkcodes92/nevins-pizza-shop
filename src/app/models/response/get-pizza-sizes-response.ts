import { PizzaSize } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetPizzaSizesResponse extends ApiResponse {
    pizzaSizes: PizzaSize[];
}