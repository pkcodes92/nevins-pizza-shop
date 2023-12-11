import { ToppingType } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetToppingTypesResponse extends ApiResponse {
    toppingTypes: ToppingType[];
}