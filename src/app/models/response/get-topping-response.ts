import { Topping } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetToppingResponse extends ApiResponse {
    topping: Topping;
}