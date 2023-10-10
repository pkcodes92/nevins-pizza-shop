import { Crust } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddCrustResponse extends ApiResponse {
    crust: Crust;
}