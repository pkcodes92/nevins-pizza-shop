import { CouponType } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCouponTypeResponse extends ApiResponse {
    couponType: CouponType;
}