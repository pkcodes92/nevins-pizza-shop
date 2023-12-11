import { ToppingType } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetToppingTypeResponse extends ApiResponse {
    toppingType: ToppingType;
}