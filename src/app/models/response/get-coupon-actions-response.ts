import { CouponAction } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCouponActionsResponse extends ApiResponse {
    couponActions: CouponAction[];
}