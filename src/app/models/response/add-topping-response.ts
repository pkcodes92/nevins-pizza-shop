import { Topping } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddToppingResponse extends ApiResponse {
    topping: Topping;
}