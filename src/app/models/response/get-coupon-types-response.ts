import { CouponType } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCouponTypesResponse extends ApiResponse {
    couponTypes: CouponType[];
}