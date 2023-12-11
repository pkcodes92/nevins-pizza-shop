import { OrderStatus } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateOrderStatusResponse extends ApiResponse {
    orderStatus: OrderStatus;
}