import { UserType } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetUserTypesResponse extends ApiResponse {
    userTypes: UserType[];
}