import { PizzaSauce } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetPizzaSauceResponse extends ApiResponse {
    pizzaSauce: PizzaSauce;
}