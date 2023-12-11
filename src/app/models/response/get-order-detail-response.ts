import { OrderDetail } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetOrderDetailResponse extends ApiResponse {
    orderDetail: OrderDetail;
}