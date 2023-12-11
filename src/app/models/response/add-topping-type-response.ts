import { ToppingType } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddToppingTypeResponse extends ApiResponse {
    toppingType: ToppingType;
}