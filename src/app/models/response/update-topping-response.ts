import { Topping } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateToppingResponse extends ApiResponse {
    topping: Topping;
}