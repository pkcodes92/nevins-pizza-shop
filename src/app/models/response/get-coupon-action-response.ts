import { CouponAction } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCouponActionResponse extends ApiResponse {
    couponAction: CouponAction;
}