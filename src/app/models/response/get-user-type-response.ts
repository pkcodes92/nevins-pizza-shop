import { UserType } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetUserTypeResponse extends ApiResponse {
    userType: UserType;
}