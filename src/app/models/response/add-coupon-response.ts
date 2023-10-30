import { Coupon } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddCouponResponse extends ApiResponse {
    coupon: Coupon;
}