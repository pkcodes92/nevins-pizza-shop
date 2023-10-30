import { CouponType } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddCouponTypeResponse extends ApiResponse {
    couponType: CouponType;
}