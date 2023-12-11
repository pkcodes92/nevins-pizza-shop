import { Crust } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetCrustsResponse extends ApiResponse {
    crusts: Crust[];
}