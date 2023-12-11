import { ToppingType } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateToppingTypeResponse extends ApiResponse {
    toppingType: ToppingType;
}