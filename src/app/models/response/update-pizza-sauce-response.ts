import { PizzaSauce } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdatePizzaSauceResponse extends ApiResponse {
    pizzaSauce: PizzaSauce;
}