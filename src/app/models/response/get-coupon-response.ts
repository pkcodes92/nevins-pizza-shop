import { Coupon } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCouponResponse extends ApiResponse {
    coupon: Coupon;
}