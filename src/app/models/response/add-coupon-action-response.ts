import { CouponAction } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddCouponActionResponse extends ApiResponse {
    couponAction: CouponAction;
}