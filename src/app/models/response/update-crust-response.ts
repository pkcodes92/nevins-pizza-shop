import { Crust } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateCrustResponse extends ApiResponse {
    crust: Crust;
}