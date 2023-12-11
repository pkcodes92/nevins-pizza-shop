import { UserType } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateUserTypeResponse extends ApiResponse {
    userType: UserType;
}