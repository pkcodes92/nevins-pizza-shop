import { OrderStatus } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddOrderStatusResponse extends ApiResponse {
    orderStatus: OrderStatus;
}