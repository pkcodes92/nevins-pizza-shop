import { PizzaSauce } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetPizzaSaucesResponse extends ApiResponse {
    pizzaSauces: PizzaSauce[];
}