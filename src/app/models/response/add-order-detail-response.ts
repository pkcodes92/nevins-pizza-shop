import { OrderDetail } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddOrderDetailResponse extends ApiResponse {
    orderDetail: OrderDetail;
}