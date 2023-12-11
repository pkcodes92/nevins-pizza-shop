import { CouponType } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateCouponTypeResponse extends ApiResponse {
    couponType: CouponType;
}