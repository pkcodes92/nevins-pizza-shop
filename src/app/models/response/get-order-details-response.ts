import { OrderDetail } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetOrderDetailsResponse extends ApiResponse {
    orderDetails: OrderDetail[];
}