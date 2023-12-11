import { Coupon } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCouponsResponse extends ApiResponse {
    coupons: Coupon[];
}