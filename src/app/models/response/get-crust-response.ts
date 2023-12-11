import { Crust } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCrustResponse extends ApiResponse {
    crust: Crust;
}