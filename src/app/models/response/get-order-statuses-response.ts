import { OrderStatus } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetOrderStatusesResponse extends ApiResponse {
    orderStatuses: OrderStatus[];
}