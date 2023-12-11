import { PizzaSauce } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddPizzaSauceResponse extends ApiResponse {
    pizzaSauce: PizzaSauce;
}