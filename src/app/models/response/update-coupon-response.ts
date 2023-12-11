import { Coupon } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateCouponResponse extends ApiResponse {
    coupon: Coupon;
}