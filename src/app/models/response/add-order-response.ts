import { Order } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddOrderResponse extends ApiResponse {
    order: Order;
}