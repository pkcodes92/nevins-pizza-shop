import { CouponAction } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateCouponActionResponse extends ApiResponse {
    couponAction: CouponAction;
}