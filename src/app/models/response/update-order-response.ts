import { Order } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateOrderResponse extends ApiResponse {
    order: Order;
}