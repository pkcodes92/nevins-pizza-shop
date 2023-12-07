import { UserType } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddUserTypeResponse extends ApiResponse {
    userType: UserType;
}