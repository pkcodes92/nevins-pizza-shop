import { OrderDetail } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateOrderDetailResponse extends ApiResponse {
    orderDetail: OrderDetail;
}