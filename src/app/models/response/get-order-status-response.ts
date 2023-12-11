import { OrderStatus } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetOrderStatusResponse extends ApiResponse {
    orderStatus: OrderStatus;
}